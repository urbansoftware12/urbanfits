import LinkBtn from '../buttons/link_btn'

const Card = (props)=> {
  return (
    <div className={`${props.classes} ${props.round? props.round: "rounded-3xl" } bg-white card_boxshadow flex flex-col hover:rounded-xl hover:scale-[1.01] transition-all duration-300`}>
      <h2 className="mb-3 font_urbanist_medium tracking-widest text-xl md:text-[22px]">{props.title}</h2>
      <p className={`${props.valueCenter?'text-center':''} max-w-[85%] md:max-w-[80%] mb-7 font_urbanist_light text-center md:text-left text-black`}>{props.value}</p>
      <LinkBtn href={props.href? props.href:"#"} my='0' font='font_urbanist_medium tracking-widest' classes={props.btnClasses?props.btnClasses:'md:w-[200px] max-w-[200px]'} >{props.btnValue}</LinkBtn>
    </div>
  )
}

export default Card