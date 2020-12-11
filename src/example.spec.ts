/**
 * @name FriendList
 * @description Feature
 */
class FriendList {
    public friend = [];

    public addFriend(name: string): void {
        this.friend.push(name);
        this.announceFriendship(name);
    }

    public announceFriendship(name: string): void {
        global.console.log(`${name} is now a friend !`);
    }

    public removeFriend(name: string): void {
        const idx = this.friend.indexOf(name);

        if (idx === -1) {
            throw new Error('Friend not exist');
        }

        this.friend.splice(idx, 1);
    }
}

/**
 * Test
 */
describe('FriendList', () => {
    let friendList: FriendList;

    beforeEach(() => {
        friendList = new FriendList();
    });

    it('Initializes friends list', () => {
        expect(friendList.friend.length).toEqual(0);
    });

    it('Adds a friend to the list', () => {
        friendList.addFriend('Test Name');

        expect(friendList.friend.length).toEqual(1);
        expect(friendList.friend).toEqual(['Test Name']);
    });

    it('announces friendship', () => {
        friendList.announceFriendship = jest.fn();
        expect(friendList.announceFriendship).not.toHaveBeenCalled();

        friendList.addFriend('Test Name');
        expect(friendList.announceFriendship).toHaveBeenCalled();
    });

    describe('RemoveFriend', () => {
        it('Removes a friend from the list', () => {
            friendList.addFriend('Test Name');
            expect(friendList.friend[0]).toEqual('Test Name');

            friendList.removeFriend('Test Name');
            expect(friendList.friend[0]).toEqual(undefined);
        });

        it('Throws an error as friend does not exist', () => {
            expect(() => friendList.removeFriend('Test Name')).toThrow(new Error('Friend not exist'));
        });
    });
});
