# Read before you examine!

All info about the project is given in this readme file, after reading this file the code is assumed to be self-explanatory.

## Exciting Features and Efficiency:  
- Whole data is coming from and updating Firestore. Reloading retains the chats and order of chats 
- Only that chat is loaded that is required. I have kept chats and users as different collections in firebase.
- The change of order of users in chat list is done by a single request efficiently.
- All errors are handled and notified to the user.

## Packages used
- react-router-dom: for routing
- react-toastify: for displaying messages.
- react-spinners: for spinner in loading phase.

## CSS

- used css modules


## Components
- Screen: The main component that gets rendered and remains till end. It contains all the chat data. It renders Chat and ChatLink components.
- ChatLink: The reusable component that appears on left hand side of the chat that contains all the users along with the recent chat.
- Chat- The main chat component that lets you chat with the user.

## Routing

- I have used react router-dom.
- The chats have path as /chat/:id

## Outlet Context
- I have used outlet context to load chat from Scree component.