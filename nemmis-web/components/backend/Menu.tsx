interface Props{
  onClickToggle: () => void;
}

export default function Menu(props: Props) {

  const { onClickToggle } = props;

  const handleOnClickToggle = () => {
    onClickToggle();
  }
  return (
    <nav className="block bg-green-950 opacity-70 backdrop-blur-sm sticky h-16 w-full"><div className="rounded border-black bg-white cursor-pointer" onClick={handleOnClickToggle}>toggle</div>Menu</nav>
  )
}
