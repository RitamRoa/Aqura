
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const OPENWEATHERMAP_API_KEY = Deno.env.get('OPENWEATHERMAP_API_KEY')
    if (!OPENWEATHERMAP_API_KEY) {
      throw new Error('OpenWeatherMap API key not configured')
    }

    const { lat, lon } = await req.json()
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    )
    const data = await response.json()

    // Process weather data and create alerts if necessary
    const alerts = []
    if (data.main.temp > 35) {
      alerts.push({
        type: 'temperature',
        severity: 'high',
        description: 'High temperature alert - potential water stress'
      })
    }
    if (data.main.humidity < 30) {
      alerts.push({
        type: 'humidity',
        severity: 'warning',
        description: 'Low humidity alert - increased water demand likely'
      })
    }

    return new Response(JSON.stringify(alerts), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
