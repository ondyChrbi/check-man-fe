import {Status} from "../../../lib/graphql/challengeQuery";

export const statusBackgroundColorMap = new Map([
    [Status.APPROVED, "bg-green-600"],
    [Status.RETURN_TO_EDIT, "bg-return-to-edit"],
    [Status.DENIED, "bg-red-800"],
    [Status.WAITING_TO_REVIEW, "bg-gray-600"],
]);

export const statusBackgroundTextColorMap = new Map([
    [Status.APPROVED, "text-green-600"],
    [Status.RETURN_TO_EDIT, "text-return-to-edit"],
    [Status.DENIED, "text-red-800"],
    [Status.WAITING_TO_REVIEW, "text-gray-600"],
]);

export const statusFontColorMap = new Map([
    [Status.APPROVED, "text-green-600"],
    [Status.RETURN_TO_EDIT, "text-return-to-edit"],
    [Status.DENIED, "text-red-800"],
    [Status.WAITING_TO_REVIEW, "text-gray-600"],
]);