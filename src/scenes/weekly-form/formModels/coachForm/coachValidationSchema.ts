import * as yup from "yup";
import coachModel from "./coachModel";

const {
    formField: { totalVolume, trainingType, comment },
} = coachModel;

export default yup.object().shape({
    [totalVolume.name]: yup
        .number()
        .typeError("not a number")
        .positive("not a positive number")
        .integer("not an integer")
        .required("required"),
    [trainingType.name]: yup.string().required("required"),
    [comment.name]: yup.string(),
});
