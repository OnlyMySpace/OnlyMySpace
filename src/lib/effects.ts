export interface Item {
    cost: number;
    description: string;
    image: string;
}

export const items: { [key: string]: Item } = {
    Hamster: {
        cost: 100,
        description: 'A hamster running around your profile in a circle',
        image: "https://cdn-icons-png.flaticon.com/512/118/118738.png"
    },
    Matrix: {
        cost: 100,
        description: 'A coding matrix effect on your profile picture',
        image: "https://cdn-icons-png.flaticon.com/512/118/118738.png"
    },
    Heart: {
        cost: 100,
        description: 'Floating hearts on your profile picture',
        image: "https://cdn-icons-png.flaticon.com/512/118/118738.png"
    }
};