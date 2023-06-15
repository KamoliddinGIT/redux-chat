import { createReducer } from "@reduxjs/toolkit";
import {
  addComment,
  addLike,
  addLikeReplies,
  chatFetched,
  chatFetching,
  chatFetchingError,
  deleteReplies,
  limitMinusFunc,
  limitMinusReplies,
  limitPlusFunc,
  limitPlusReplies,
  onlyMinus,
  onlyMinusReplies,
  onlyPlus,
  onlyPlusReplies,
  removeComment,
  removeLike,
  removeLikeReplies,
  replyUser,
} from "../actions/actions";
import moment from "moment/moment";
import { v4 } from "uuid";

const initialState = {
  comments: [],
  isLoading: "none",
};
const ChatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chatFetching, (state) => {
      state.isLoading = "loading";
    })
    .addCase(chatFetched, (state, action) => {
      state.isLoading = "loaded";
      state.comments = action.payload;
    })
    .addCase(chatFetchingError, (state) => {
      state.isLoading = "loadingError";
    })
    .addCase(addLike, (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            score: elem.score + 1,
          };
        } else {
          return elem;
        }
      });

      state.comments = newComments;
    })
    .addCase(removeLike, (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            score: elem.score - 1,
          };
        } else {
          return elem;
        }
      });

      state.comments = newComments;
    })
    .addCase(limitPlusFunc, (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitPlus: true,
            limitMinus: false,
          };
        } else {
          return elem;
        }
      });

      state.comments = newComments;
    })
    .addCase(limitMinusFunc, (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitPlus: false,
            limitMinus: true,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    })
    .addCase(addComment, (state, action) => {
      const newComment = {
        id: v4(),
        content: action.payload,
        createdAt: moment().format("DD. MM YYYY"),
        score: 0,
        user: {
          image: {
            png: "https://interactive-comments-section-azure.vercel.app/images/avatars/image-juliusomo.png",
          },
          username: "siredev",
        },
        replies: [],
        limitPlus: false,
        limitMinus: true,
      };

      state.comments = [...state.comments, newComment];
    })
    .addCase(onlyPlus, (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitPlus: false,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    })
    .addCase(onlyMinus, (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            limitMinus: false,
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    })
    .addCase(removeLikeReplies, (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              score: elem.score > 0 ? elem.score - 1 : elem.score,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    })
    .addCase(addLikeReplies, (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              score: elem.score + 1,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    })
    .addCase(onlyPlusReplies, (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitPlus: false,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    })
    .addCase(onlyMinusReplies, (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitMinus: false,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    })
    .addCase(limitPlusReplies, (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitPlus: true,
              limitMinus: false,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    })
    .addCase(limitMinusReplies, (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              limitPlus: false,
              limitMinus: true,
            };
          } else {
            return elem;
          }
        });
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    })
    .addCase(deleteReplies, (state, action) => {
      const newReplies = state.comments.map((item) => {
        const newReply = item.replies.filter(
          (elem) => elem.id !== action.payload
        );
        return newReply;
      });
      const newComments = state.comments.map((item, index) => {
        return {
          ...item,
          replies: newReplies[index],
        };
      });
      state.comments = newComments;
    })
    .addCase(removeComment, (state, action) => {
      const newComments = state.comments.filter(
        (item) => item.id !== action.payload
      );
      state.comments = newComments;
    })
    .addCase(replyUser, (state, action) => {
      const newComments = state.comments.map((elem) => {
        if (elem.id === action.payload.id) {
          return {
            ...elem,
            replies: [...elem.replies, action.payload.newReplyUser],
          };
        } else {
          return elem;
        }
      });
      state.comments = newComments;
    })
    .addDefaultCase(() => {});
});

export default ChatReducer;
