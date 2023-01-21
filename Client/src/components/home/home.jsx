import Header from "./header";
import NewQuestionButton from "./newTopicButton";
import Posts from "./posts";
const Home = () => {
    return (
        <div>
            <Header />
            <NewQuestionButton />
            <Posts />
        </div>
    )
}

export default Home;