import GenreSelector from "../components/Genre/GenreSelector"


function ChooseGenrePage ({likes, setLikes, selections}) {



  return (
    <>
      <h1>Genre Page</h1>
      <GenreSelector likes={likes} setLikes={setLikes}/>
    </>

  )

}

export default ChooseGenrePage