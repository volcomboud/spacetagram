import React from 'react';
import {useEffect, useState} from "react";
import {db} from "../lib/firebase";
import {collection, getDocs, addDoc, query, where} from 'firebase/firestore'
import {getFormat} from '../lib/dateFormat'

const apiKey =process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;


export default function NasaFetcher(){

    const [nasaData, setNasaData] = useState(null);
    const [date, setDate] = useState(false);
    const dailyCollectionRef = collection(db, 'nasadaily')

    const laDate= getFormat()
    const q = query(dailyCollectionRef, where("date","==", `${laDate}`))


    useEffect(() =>{

        //TODO Changer le nom de makesnap : fais pas de sens
        makeSnap();

            async function pullData() {
                const response = await fetch(
                    url
                );
                return await response.json();
            }
             async function addToDatabase(props){

                const data = {
                    title: props.title,
                    explanation: props.explanation,
                    date: props.date,
                    url: props.url,
                    heartCount: 0
                };
                console.log()
                 await addDoc(dailyCollectionRef, data)
            }
            async function makeSnap() {
                const querySnapshot = await getDocs(q);
                if(querySnapshot.empty){
                    pullData().then(r => {
                        console.log(r)
                        setNasaData(r);
                        addToDatabase(r).then(() => {
                            console.log("picture of the day added to the database")
                        })
                    });
                }else {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                    })
                    console.log("Database is up to date...")
                }
            }

        //TODO ICI peut etre delete

    }, [])

    if(!nasaData)return <div/>;


    return(
        <div>
            <img
            src={nasaData.url}
            alt={nasaData.title}/>
        </div>


    )
}