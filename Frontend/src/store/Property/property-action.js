//action is an you can think of it like an instruction
import { propertyAction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";

//get all the properties
//1 start api request
// 2we will tell redux that loding started
//3get search parameters
//4call backend api
//wait for response
//get property data
//send data to redux store
//if error => send error to redux
export const getAllProperties =() => async(dispatch, getState)=>{
    try{
        console.log("Api call started");//just for ourselves to see
        dispatch(propertyAction.getRequest())

        const {searchParams} = getState().properties
        console.log(searchParams)
        const response = await axiosInstance.get(`/v1/rent/listing`,{
            params:{...searchParams}
        })
        if(!response){
            throw new Error("could not fetch any properties")
        }

        const {data} = response;
        console.log(data);
        dispatch(propertyAction.getProperties(data))
    }catch(error){
        dispatch(propertyAction.getErrors(error.message))

    }
}