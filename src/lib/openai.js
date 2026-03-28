const OPENAI_URL = 'https://api.openai.com/v1/responses'

export async function generateClinicalSuggestion({ context, prompt }) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error(
      'Defina VITE_OPENAI_API_KEY no arquivo .env para habilitar a integracao.'
    )
  }

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content:
            'Voce e um assistente de apoio para CRM medico. Nao substitui julgamento clinico.',
        },
        {
          role: 'user',
          content: `Contexto do paciente:\n${context}\n\nSolicitacao:\n${prompt}`,
        },
      ],
      temperature: 0.3,
    }),
  })

  if (!response.ok) {
    let details = ''
    try {
      const errorJson = await response.json()
      details = errorJson?.error?.message || ''
    } catch {
      details = ''
    }
    throw new Error(`Erro da OpenAI (${response.status}): ${details}`.trim())
  }

  const data = await response.json()
  return data.output_text || 'Sem resposta textual da OpenAI.'
}
