const users = [
  { id: 101, name: "ID" },
  { id: 102, name: "BJ" },
  { id: 103, name: "PJ" },
  { id: 104, name: "HA" },
  { id: 105, name: "JE" },
  { id: 106, name: "JI" },
];

const posts = [
  { id: 201, body: "내용1", user_id: 101 },
  { id: 202, body: "내용2", user_id: 102 },
  { id: 203, body: "내용3", user_id: 103 },
  { id: 204, body: "내용4", user_id: 102 },
  { id: 205, body: "내용5", user_id: 101 },
];

const comments = [
  { id: 301, body: "댓글1", user_id: 105, post_id: 201 },
  { id: 302, body: "댓글2", user_id: 104, post_id: 201 },
  { id: 303, body: "댓글3", user_id: 104, post_id: 202 },
  { id: 304, body: "댓글4", user_id: 105, post_id: 203 },
  { id: 305, body: "댓글5", user_id: 106, post_id: 203 },
  { id: 306, body: "댓글6", user_id: 106, post_id: 204 },
  { id: 307, body: "댓글7", user_id: 102, post_id: 205 },
  { id: 308, body: "댓글8", user_id: 103, post_id: 204 },
  { id: 309, body: "댓글9", user_id: 103, post_id: 202 },
  { id: 310, body: "댓글10", user_id: 105, post_id: 201 },
];

const posts_by = (attr) => _.where(posts, attr);
const comments_by = (attr) => _.where(comments, attr);

const comments_by_posts = _.pipe(
  _.pluck("id"),
  (post_ids) =>
    _.filter(comments, (comment) =>
      _.contains(post_ids, comment.post_id)
    )
);

const posts_by_comments = _.pipe(
  _.pluck("post_id"),
  _.uniq,
  (post_ids) =>
    _.filter(posts, (post) => _.contains(post_ids, post.id))
);

const comments_to_user_names = _.map(
  (comment) =>
    _.find(users, (user) => user.id === comment.user_id)
      .name
);

// 1. 특정인의 posts의 모든 comments 거르기
const f1 = _.pipe(posts_by, comments_by_posts);

console.log(f1({ user_id: 101 }));

// 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
const f2 = _.pipe(f1, comments_to_user_names, _.uniq);

console.log(f2({ user_id: 101 }));

// 3. 특정인의 posts에 comments를 단 친구들 카운트 정보
const f3 = _.pipe(f1, comments_to_user_names, _.count_by);

console.log(f3({ user_id: 101 }));

// 4. 특정인이 comment를 단 posts 거르기
const f4 = _.pipe(comments_by, posts_by_comments);

console.log(f4({ user_id: 105 }));

console.clear();
// 5. users + posts + comments (index_by와 group_by로 효율 높이기 => 인덱싱되여 탐색시간 1로 단축)
const _users = _.index_by(users, "id");

const comments2 = _.go(
  comments,
  _.map((comment) =>
    _.extend({ user: _users[comment.user_id] }, comment)
  ),
  _.group_by("post_id")
);

const posts2 = _.map(posts, (post) =>
  _.extend(
    {
      user: _users[post.user_id],
      comments: comments2[post.id] || [],
    },
    post
  )
);

const _posts = _.group_by(posts2, "user_id");

const users2 = _.map(_users, (user) =>
  _.extend(
    {
      posts: _posts[user.id] || [],
    },
    user
  )
);

const user = users2[0];
// 5.1. 특정인의 posts의 모든 comments 거르기
_.go(
  user,
  _.deep_pluck("posts.comments"),
  _.flatten,
  console.log
);

// 5.2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
_.go(
  user,
  _.deep_pluck("posts.comments.user.name"),
  _.uniq,
  console.log
);

// 5.3. 특정인의 posts에 comments를 단 친구들 카운트 정보
_.go(
  user,
  _.deep_pluck("posts.comments.user.name"),
  _.count_by,
  console.log
);

// 5.4. 특정인이 comment를 단 posts 거르기
_.go(
  posts2,
  _.filter((post) =>
    _.find(
      post.comments,
      (comment) => comment.user_id === 105
    )
  ),
  console.log
);
