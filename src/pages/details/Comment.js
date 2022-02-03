import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from '../../hooks/useCollection'

// styles
import './CardDetails.css'
import Avatar from '../../components/Avatar'

export default function Comment() {
  const { user } = useAuthContext()
  const { addDocument } = useFirestore('comments')
  const { documents, error } = useCollection('comments')

  // state
  const [comment, setComment] = useState('')
  const [messageError, setMessageError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)

    const commentFields = {
      comment,
      sender: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    }
    try {
      await addDocument(commentFields)
      setComment('')
      setIsPending(false)
    } catch (err) {
      setMessageError(err.message)
      setIsPending(false)
    }
  }

  return (
    <div className="comment-wrapper">
      <div className="comment-body">
        {documents &&
          documents.map((comment) => (
            <div className="comment" key={comment.id}>
              <Avatar src={comment.photoURL} />
              <p>{comment.sender}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="profile-input">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {isPending ? (
            <button disabled>Sending...</button>
          ) : (
            <button>Send</button>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        {messageError && <p className="error">{messageError}</p>}
      </form>
    </div>
  )
}
