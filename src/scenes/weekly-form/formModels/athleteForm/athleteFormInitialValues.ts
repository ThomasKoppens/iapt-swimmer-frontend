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

export default {
    [wellness.name]: 3,
    [motivation.name]: 3,
    [sleepQuality.name]: 3,
    [fatigue.name]: 3,
    [soreness.name]: 3,
    [rpe.name]: 5,
    [comment.name]: "",
};
