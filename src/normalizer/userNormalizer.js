export default (user) => {
    const out = {
      id: user._id,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatar,
    }
    if(user.accessToken) {
      out.accessToken = user.accessToken;
      out.refreshToken = user.refreshToken;
    }

    if(user.avatarUrl) {
      out.avatar = user.avatarUrl;
    }
    return out
  }