import { useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectFriend, setSelectFriend] = useState(null)

  function handleShowAddFriend() {
    setSelectFriend(null)
    setShowAddFriend((showAddFriend) => !showAddFriend)
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false)
  }

  function handleSelection(friend) {
    setShowAddFriend(false)
    setSelectFriend(friend.id === selectFriend?.id ? null : friend)
  }

  function handleSplitBill(value) {
    console.log(value)
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )
    setSelectFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          curSelect={selectFriend}
          onSelect={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'close' : 'Add Friend'}
        </Button>
      </div>
      {selectFriend && (
        <FormSplitBill curSelect={selectFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  )
}

function FriendList({ friends, onSelect, curSelect }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          curSelect={curSelect}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}

function Friend({ friend, onSelect, curSelect }) {
  const { id, name, image, balance } = friend
  const isSelected = curSelect?.id === id
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">
          You own {name} {Math.abs(balance)}€.
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owns You {Math.abs(balance)}€.
        </p>
      )}
      {balance === 0 && <p>You and {name} are even.</p>}

      <Button onClick={() => onSelect(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !image) return
    const id = crypto.randomUUID()
    onAddFriend({
      id,
      name,
      image: `${image}?${id}`,
      balance: 0,
    })
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🎀Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({ curSelect, onSplitBill }) {
  const { name } = curSelect

  const [bill, setBill] = useState('')
  const [payByUser, setPayByUser] = useState('')
  const payByFriend = bill - payByUser ? bill - payByUser : ''
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  function handleSplitBill(e) {
    e.preventDefault()
    if (!bill || !payByUser) return
    onSplitBill(
      whoIsPaying === 'user' ? Number(payByFriend) : -Number(payByUser)
    )
  }

  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={payByUser}
        onChange={(e) =>
          setPayByUser(
            Number(e.target.value) > bill ? payByUser : Number(e.target.value)
          )
        }
      />

      <label>👫 {name}'s expense</label>
      <input type="text" value={payByFriend} disabled />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>
      <Button onClick={handleSplitBill}>Split Bill</Button>
    </form>
  )
}

export default App
