import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
// const { TextArea } = Input;

function Comments(props) {

  const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        
    console.log('variables', variables)

    Axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if(response.data.success) {
          console.log('Big', response.data.result)
          // console.log('small', response.data.err)
        }else{
          alert('대실패대실패')
        }
      })
    };

  return (
    <div>
      <br />
      <p>리뷰 쓰면 토큰 에어드랍!</p>
      <hr />

      {/* Comment Lists */}
      {props.CommentLists && props.CommentLists.map((comment, index) => (
        (!comment.responseTo &&
          <React.Fragment>
            <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
            <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
          </React.Fragment>
        )
      ))}

      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={Comment}
          placeholder="리뷰 해주세요"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default  Comments;

//submit 버튼 누르면 정보들이 detailproductpage에 const comment, setcomment의 comment 부분으로 날아간다