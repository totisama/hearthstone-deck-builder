import '../Styles/Loader.scss'

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}
    ><span class='loader' />
    </div>

  )
}

export default Loader
