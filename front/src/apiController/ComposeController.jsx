import axios from 'axios';
import { handlePageReload } from '../MainPage/Components/PageReload';
const BASE_URL="http://localhost:8080/api"
export const sendMessage = async (
  e,
  recipients,
  subject,
  content,
  from,
  importance,
  attachments,
  user,
  setError,
  setIsLoading,
  set_to,
  set_subject,
  set_content,
  setImportance,
  setAttachments,
  setUser,
  setRecipients,
) => {
  e.preventDefault();  
  const filteredRecipients = recipients.filter(rec => rec.trim() !== '');
  
  // Validation checks
  if (filteredRecipients.length === 0 || !subject.trim() || !content.trim()) {
    setError("All fields are required");
    return;
  }
  
  if (filteredRecipients.some(rec => rec === user.email)) {
    setError("You cannot send a message to yourself");
    return;
  }

  try {
    // Check if recipients are valid
    const res = await axios.get(`${BASE_URL}/check/${filteredRecipients}`,{
      auth: {
        username: user.email,
        password: user.password
      }
    });
  } catch (error) {
    setError(error.response.data.message);
    return;
  }

  setIsLoading(true);

  // Send messages to each recipient
  for (const recipient of filteredRecipients) {
    try {
      const response = await axios.put(`${BASE_URL}/message`, {
        toemail: recipient,
        fromemail: from,
        message: content,
        subject: subject,
        importance: importance === "high" ? 10 : importance === "medium" ? 5 : 0,
        attachments: attachments
      },{
        auth:{
          username: user.email,
          password: user.password
        }
      });

      if (response.status === 200) {
        setError(null);
        set_to('');
        set_subject('');
        set_content('');
        setImportance('medium');
        setAttachments([]);
        console.log('successful:', response.data);
        setUser(response.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle page reload and reset recipients
  handlePageReload(user, setUser);
  setRecipients(['']);
};