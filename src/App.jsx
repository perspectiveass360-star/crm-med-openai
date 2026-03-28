import { useState } from 'react'
import { generateClinicalSuggestion } from './lib/openai'

function App() {
  const [context, setContext] = useState(
    'Paciente: Maria, 58 anos, hipertensão controlada. Queixa: dor de cabeça leve há 2 dias.'
  )
  const [prompt, setPrompt] = useState(
    'Crie um resumo de atendimento e próximos passos.'
  )
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setAnswer('')

    try {
      const text = await generateClinicalSuggestion({ context, prompt })
      setAnswer(text)
    } catch (err) {
      setError(err.message || 'Falha ao consultar a OpenAI.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <h1>CRM Med - Assistente OpenAI</h1>
      <p className="subtitle">
        Gera sugestoes de resumo e conduta com base no contexto clinico.
      </p>

      <form onSubmit={handleSubmit} className="card">
        <label htmlFor="context">Contexto do paciente</label>
        <textarea
          id="context"
          value={context}
          onChange={(event) => setContext(event.target.value)}
          rows={6}
          required
        />

        <label htmlFor="prompt">Solicitacao para a IA</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={3}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Consultando...' : 'Gerar resposta'}
        </button>
      </form>

      {(answer || error) && (
        <section className="card output">
          <h2>Resposta</h2>
          {error ? <p className="error">{error}</p> : <pre>{answer}</pre>}
        </section>
      )}
    </main>
  )
}

export default App
