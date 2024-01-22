import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails() {
    return(
        <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
};

export async function getStaticPaths() {
    //fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://sowmiya2641gmail:Ramya1504@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majoritymongodb+srv://maximilian:arlAapzPqFyo4xUk@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    });

    const meetups = await meetupsCollection.find({}, {_id:1}).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString() },
        })) 
    };
};

export async function getStaticProps(context) {
    //fetch data for a single meetup
    
    const meetupId = context.params.meetupId;
    console.log(meetupId);
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        },
    };
}

export default MeetupDetails;