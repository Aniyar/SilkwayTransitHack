import MainPageContainer from '../components/mainPageContainer/index';

const MainPage = ({CurrentUsersName, Id, type}) => {
    return (
        <MainPageContainer CurrentUsersName={CurrentUsersName} Id={Id} type={type} />
    )
}

export default MainPage;