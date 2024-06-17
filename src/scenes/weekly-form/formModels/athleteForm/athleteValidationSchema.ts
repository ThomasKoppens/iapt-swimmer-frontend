import * as yup from "yup";
import athleteModel from "./athleteModel";

const {
    formField: {
        wellness,
        motivation,
        sleepQuality,
        fatigue,
        soreness,
        rpe,
        comment,
    },
} = athleteModel;

export default yup.object().shape({
    [wellness.name]: yup.number().required("required"),
    [motivation.name]: yup.number().required("required"),
    [sleepQuality.name]: yup.number().required("required"),
    [fatigue.name]: yup.number().required("required"),
    [soreness.name]: yup.number().required("required"),
    [rpe.name]: yup.number().required("required"),
    [comment.name]: yup.string(),
});
