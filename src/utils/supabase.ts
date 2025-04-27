
import { Language } from './languageUtils';
import { supabase } from '@/integrations/supabase/client';

export async function reportWaterIssue(data: {
  issueType: string;
  location: string;
  description: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
}) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('Not authenticated');

  return supabase.from('water_issues').insert({
    user_id: user.data.user.id,
    ...data
  });
}

export async function getWaterIssues() {
  return supabase
    .from('water_issues')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function updateIssueStatus(issueId: string, status: string) {
  return supabase
    .from('water_issues')
    .update({ status })
    .eq('id', issueId);
}

export async function uploadIssueImage(file: File) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('Not authenticated');

  const fileExt = file.name.split('.').pop();
  const filename = `${Math.random()}.${fileExt}`;
  const filePath = `${user.data.user.id}/${filename}`;

  const { error: uploadError, data } = await supabase.storage
    .from('issue_images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('issue_images')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function getChatResponse(message: string, language: Language) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await supabase.functions.invoke('water-chat', {
    body: { message }
  });

  if (response.error) throw response.error;

  // Store chat history
  await supabase.from('chat_history').insert({
    user_id: session.user.id,
    query: message,
    response: response.data.response
  });

  return response.data.response;
}
