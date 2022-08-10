import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {getCourseSemesterQuery, SemesterQuery} from "../../lib/graphql/meQuery";

const CourseSemesterDetail = () => {
    const {semesterId} = useParams<'courseId' | 'semesterId'>();
    const {loading, error, data} = useQuery<SemesterQuery>(getCourseSemesterQuery, {
        variables: { "id" : semesterId }
    });

    if (loading) return <>Loading</>

    if (error) return <>Error</>

    return <>
        <aside></aside>
        <section>
            <h1>{data?.semester?.id}</h1>
            <h2>{data?.semester?.dateStart} - {data?.semester?.dateEnd}</h2>
            <p>{data?.semester?.note}</p>
        </section>
    </>
}

export default CourseSemesterDetail;