import User from '../models/User.js';

// import bookSchema from '../models/Book';
import { AuthenticationError, signToken } from '../utils/auth.js';

interface SaveBookArgs {
    input: {
      authors: string[];
      description: string;
      bookId: string;
      image: string;
      link: string;
      title: string;
    };
  }
interface AddUserArgs {

      username: string;
      email: string;
      password: string;

  }
  interface RemoveBookArgs {
    bookId: string;
  }


const resolvers = {
    Query: {
        user: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id });
                return user;
            }
            throw new Error('Not logged in');
        },
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new Error('Incorrect credentials');
        }
    },
    Mutation: {
        login: async (_: any, { email, password }: any) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('No user with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Incorrect credentials');
            }
            const token = signToken(user.email, user.password, user._id);
            return { token, user };
        },
        addUser: async (_parent: any, { username, email, password }: AddUserArgs) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new Error('Something went wrong!');
            }
            const token = signToken(user.email, user.password, user._id);
            return { token, user };
        },
        saveBook: async (_parent: any, { input }: SaveBookArgs, context: any) => {
            if (context.user) {
              return User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
              );
            }
      throw new AuthenticationError('You must be logged in to save a book');
    },
    removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: any ) => {
        if (context.user) {
          return User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
        }
        throw new AuthenticationError('You must be logged in to remove a book');
        },
    },
};

export default resolvers;


// import User from '../models/User.js';
// // import bookSchema from '../models/Book';
// import { signToken } from '../services/auth.js';

// // interface Book {
// //     bookId: string;
// //     authors: string[];
// //     description: string;
// //     title: string;
// //     image: string;
// //     link: string;
// // }
// interface AddUserArgs {
//     input:{
//       username: string;
//       email: string;
//       password: string;
//     }
//   }

// const resolvers = {
//     Query: {
//         profile: async (_parent: any, _args: any, context: any) => {
//             if (context.user) {
//                 const profile = await User.findOne({ _id: context.user._id });
//                 return profile;
//             }
//             throw new Error('Not logged in');
//         }
//     },
//     Mutation: {
//         login: async (_: any, { email, password }: any) => {
//             const profile = await User.findOne({ email });
//             if (!profile) {
//                 throw new Error('No profile with this email found!');
//             }
//             const correctPw = await profile.isCorrectPassword(password);
//             if (!correctPw) {
//                 throw new Error('Incorrect credentials');
//             }
//             const token = signToken(profile.email, profile.password, profile._id);
//             return { token, profile };
//         },
//         addUser: async (_parent: any, { input }: AddUserArgs) => {
            
//                 const user = await User.create({ ...input });
//                 const token = signToken(user.username, user.email, user._id);
//                 return { token, user };
//           },
//         },
//         saveBook: async (_: any, { bookId, authors, description, title, image, link }: any, context: any) => {
//             if (context.user) {
//                 const updatedProfile = await User.findOneAndUpdate(
//                     { _id: context.user._id },
//                     { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
//                     { new: true, runValidators: true }
//                 );
//                 return updatedProfile;
//             }
//             throw new Error('You need to be logged in!');
//         },
//         deleteBook: async (_parent: any, { bookId }: any, context: any) => {
//             if (context.user) {
//                 const updatedProfile = await User.findOneAndUpdate(
//                     { _id: context.user._id },
//                     { $pull: { savedBooks: { bookId } } },
//                     { new: true }
//                 );
//                 return updatedProfile;
//             }
//             throw new Error('You need to be logged in!');
//         }
//     }



//     export default resolvers;
