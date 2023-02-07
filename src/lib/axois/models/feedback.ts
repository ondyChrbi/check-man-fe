/* tslint:disable */
/* eslint-disable */
/**
 * Check man Search engine REST API documentation
 * Official REST documentation for search engine using Elastic search.
 *
 * OpenAPI spec version: 0.0.1
 * Contact: ondrej.chrbolka@upce.cz
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface Feedback
 */
export interface Feedback {
    /**
     * 
     * @type {number}
     * @memberof Feedback
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof Feedback
     */
    courseId?: number;
    /**
     * 
     * @type {string}
     * @memberof Feedback
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof Feedback
     */
    type: FeedbackTypeEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum FeedbackTypeEnum {
    EXTREMELYPOSITIVE = 'EXTREMELY_POSITIVE',
    POSITIVE = 'POSITIVE',
    NEUTRAL = 'NEUTRAL',
    NEGATIVE = 'NEGATIVE'
}

