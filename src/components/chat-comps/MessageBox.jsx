import PropTypes from "prop-types";

function MessageBox({ messages }) {
  return (
    <div className="message-box">
      {messages.map((message, index) => (
        <p key={index}>
          {message.sender}: {message.text}
        </p>
      ))}
    </div>
  );
}

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MessageBox;
