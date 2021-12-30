import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';

const { TextArea } = Input;

function SingleComment(props) {

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');
// const [commentValue, setcommentValue] = useState()
  const user = useSelector((state) => state.user);

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply)
}

  const onsubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };


    Axios.post('http://localhost:4000/api/comment/saveComment', variables)
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue("")
        setOpenReply(!OpenReply) //저장후 빈칸으로 만들기 위해
        props.refreshFunction(response.data.result);
      } else {
        alert('커멘트를 저장하지 못했습니다.');
      }
    });
  };

  const actions = [
    // <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
    <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
]


  return (
    <div>
      <Comment
        actions={actions}

        author={props.comment.writer.name}

        avatar={<Avatar src={props.comment.writer.image} alt />}

        content={<p>{props.comment.content}</p>}

      ></Comment>
      {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <testarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="리뷰를 해주세요"
          />
          <br />
          <Button style={{ width: '20%', height: '52px' }} onClick={onsubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;