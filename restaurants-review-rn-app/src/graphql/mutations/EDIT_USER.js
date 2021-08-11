import gql from 'graphql-tag';

export default gql`
  mutation ($input: EditUserInput) {
    editUser(input: $input) {
      id
      email
      role
      password
    }
  }
`;
