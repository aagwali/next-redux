import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { triggerAddMeetup } from "../../services/apiHooks"

const AddMeetup = () => {
  const [addMeetup] = triggerAddMeetup.useMutation()

  return <NewMeetupForm addMeetup={addMeetup}> </NewMeetupForm>
}

export default AddMeetup
