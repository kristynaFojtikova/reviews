const userDetailsHandle = (user) => {
  if (!user) {
    return {};
  }
  const { role } = user;
  const isOwner = role === 'OWNER';
  const isCustomer = role === 'CUSTOMER';
  const isAdmin = role === 'ADMIN';
  return { isOwner, isCustomer, isAdmin, ...user };
};

export default userDetailsHandle;
