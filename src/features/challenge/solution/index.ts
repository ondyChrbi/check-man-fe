import {Status} from "../../../lib/graphql/challengeQuery";

export const statusBackgroundColorMap = new Map([
    [Status.APPROVED, "bg-green-600"],
    [Status.RETURN_TO_EDIT, "bg-gray-500"],
    [Status.DENIED, "bg-gray-500"],
    [Status.WAITING_TO_REVIEW, "bg-gray-500"],
]);

export const statusBackgroundTextColorMap = new Map([
    [Status.APPROVED, "text-green-600"],
    [Status.RETURN_TO_EDIT, "text-gray-500"],
    [Status.DENIED, "text-gray-500"],
    [Status.WAITING_TO_REVIEW, "text-gray-500"],
]);

export const statusFontColorMap = new Map([
    [Status.APPROVED, "text-green-600"],
    [Status.RETURN_TO_EDIT, "text-gray-500"],
    [Status.DENIED, "text-gray-500"],
    [Status.WAITING_TO_REVIEW, "text-gray-500"],
]);