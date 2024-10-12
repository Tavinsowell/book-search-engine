import Profile from '../../models/profile';
import Book from '../../models/Book';
import { signToken } from '../../services/auth';

interface IProfile {
    _id: string;
    username: string;
    email: string;
    bookCount: number;
    savedBooks: Book[];
}

interface IAuth {
    token: string;
    profile: IProfile;
}

const resolvers = {
    Query: {
        profile: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                const profile = await Profile.findOne({ _id: context.user._id });
                return profile;
            }
            throw new Error('Not logged in');
        }
    },
    Mutation: {
        login: async (_: any, { email, password }: any) => {
            const profile = await Profile.findOne({ email });
            if (!profile) {
                throw new Error('No profile with this email found!');
            }
            const correctPw = await profile.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Incorrect credentials');
            }
            const token = signToken(profile.email, profile.password, profile._id);
            return { token, profile };
        },
        addUser: async (_: any, { username, email, password }: any) => {
            const profile = await Profile.create({ username, email, password });
            if (!profile) {
                throw new Error('Something went wrong!');
            }
            const token = signToken(profile.email, profile.password, profile._id);
            return { token, profile };
        },
        saveBook: async (_: any, { bookId, authors, description, title, image, link }: any, context: any) => {
            if (context.user) {
                const updatedProfile = await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
                    { new: true, runValidators: true }
                );
                return updatedProfile;
            }
            throw new Error('You need to be logged in!');
        },
        deleteBook: async (_parent: any, { bookId }: any, context: any) => {
            if (context.user) {
                const updatedProfile = await Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedProfile;
            }
            throw new Error('You need to be logged in!');
        }
    }
};
    export default resolvers;
