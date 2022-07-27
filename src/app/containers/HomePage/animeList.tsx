import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { makeSelectAnimePage } from "./selectors";
import { GetAnimePage } from "../../services/animeService/__generated__/GetAnimePage";

const AnimeListContainer = styled.div`
    max.width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

const AnimeItemContainer = styled.div`
    width: 14em;
    height: 18em;
    display: flex;
    flex-direction: column;
`;

const AnimeCover = styled.div`
    width: auto;
    height: 10em;
    img {
        width: auto;
        height: 100%;
    }
`;

const AnimeTitle = styled.h6`
    margin-top: 8px;
    font-size: 19px;
    color: #000;
    font-weight: 600;
`;

const stateSelector = createSelector(makeSelectAnimePage, (animePage) => ({
    animePage
}));

const AnimeList = ( ) => {

    const { animePage } = useAppSelector(stateSelector);

    const isEmptyAnimePage =  !animePage || !animePage.media || animePage.media.length === 0;

    if (isEmptyAnimePage) 
        return null;
    return <AnimeListContainer>
        {animePage && animePage.media && animePage.media.map((anime, index) => (
            <AnimeItemContainer key={`anime-${index.toString()}`}>
                <AnimeCover>
                    <img src={anime?.coverImage?.extraLarge || ""} alt=""/>
                </AnimeCover>
                <AnimeTitle>
                    {anime?.title?.english}
                </AnimeTitle>
                <b>{anime?.averageScore}</b>
            </AnimeItemContainer>
        ))}
    </AnimeListContainer>

}

export default AnimeList;