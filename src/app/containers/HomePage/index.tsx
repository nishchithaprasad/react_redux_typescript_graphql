import React, { useEffect } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import animeService from "../../services/animeService";
import { GetAnimePage } from "../../services/animeService/__generated__/GetAnimePage";
import AnimeList from "./animeList";
import { setAnimePage } from "./homePageSlice";

interface IHomePageProps {

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispatch = (dispatch: Dispatch) => ({
    setAnimePage: (page: GetAnimePage["Page"]) => dispatch(setAnimePage(page))
});

const HomePage = (props: IHomePageProps) => {

    const { setAnimePage } = actionDispatch(useAppDispatch());

    const fetchAnimePage = async() => {
        const animePage = await animeService.getAnimePage(0, 20).catch((err) => {
            console.log("Error: ", err);
        });

        if(animePage) setAnimePage(animePage);
    };

    useEffect(() => {
        fetchAnimePage();
    }, []);

    return (
        <Container>
            <h1>Anime List</h1>
            <AnimeList/>
        </Container>
    );
}

export default HomePage;