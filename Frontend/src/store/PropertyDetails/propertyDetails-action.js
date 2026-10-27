import {propertydetailsActions} from "./propertyDetails-slice";
import {axiosInstance} from "../../utils/axios";

//fetch details of one specific property using its id
// recieve the property id 
//start loading
//call backend api
//wait for response
//get the property data
//store the details in redux
//if error store error in redux


export const getPropertyDetails =(id)=> async(dispatch)=>{
    try{
        dispatch(propertydetailsActions.getListRequest());
        const response = await axiosInstance(`/v1/rent/listing/${id}`)
        console.log(response);
        if(!response){
            throw new Error ("could not fetch any propertyDetails")
        }

        const{data} = response.data;
        dispatch(propertydetailsActions.getPropertyDetails(data))

    }catch(error){
        dispatch(propertydetailsActions.getErrors(error.response.data.error))


    }
}