const BookMark = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-bookmark"
    width={44 || props.width}
    height={44 || props.height}
    viewBox="0 0 24 24"
    strokeWidth={1.5 || props.strokeWidth}
    stroke={'#2c3e50' || props.stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2" />
  </svg>
);

export default BookMark;
