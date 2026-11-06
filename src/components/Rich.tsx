import { Fragment } from 'react'

const TOKEN = /(\[[^\]\n]+\])/g

export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <span className="ph" key={`${part}-${index}`}>
            {part}
          </span>
        ) : (
          <Fragment key={`${index}-${part.slice(0, 12)}`}>{part}</Fragment>
        ),
      )}
    </>
  )
}
