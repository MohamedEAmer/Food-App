// import { useState , useEffect } from "react";
import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx"


const requestConfig = {};

export default function Meals(){

    const {data : loadedMeals , isLoading ,error }= useHttp('http://localhost:3000/meals',requestConfig,[]);


    if(isLoading){
        return<p className="center">Fetching Meals</p>
    }

    if(error){
        return <Error title = "Failed to fetch meals" message={error}/>
    }

    // const [loadedMeals , setLoadedMeals] = useState([]);

    // useEffect(()=>{
    //     async function fetchMeals(){
    //         const response = await fetch('http://localhost:3000/meals');

    //         if(!response.ok){
    //             //error
    //         }
    
    //         const meals = await response.json();
    //         setLoadedMeals(meals);

    //     }

    //     fetchMeals();
    // }, []); // no dependencies grantede that the fuction will execute once === no infinte loop

    return(
        <ul id="meals">{loadedMeals.map((meal) => ( /*<li key={meal.id}>{meal.name}</li>*/
            <MealItem key = {meal.id} meal = {meal} />
        ))}</ul>
        //map() gives each element in the array a default name "meal" and add its props from the back end so we can use it 
    )
}