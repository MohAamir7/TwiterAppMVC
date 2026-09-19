import { describe, expect, jest, test, beforeEach } from "@jest/globals";

const createTweetService = jest.fn();

jest.unstable_mockModule("../src/Services/TweetService.js", () => ({
    createTweet: createTweetService
}));

const { createTweet } = await import("../src/controller/tweetController.js");

describe("tweetController.createTweet", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("creates a tweet successfully", async () => {
        const req = {
            body: {
                body: "My first tweet"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        createTweetService.mockResolvedValue({
            _id: "tweet-1",
            body: "My first tweet"
        });

        await createTweet(req, res);

        expect(createTweetService).toHaveBeenCalledWith({
            body: "My first tweet"
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: {
                _id: "tweet-1",
                body: "My first tweet"
            },
            message: "Tweet created successfully"
        });
    });

    test("returns the service error status", async () => {
        const req = {
            body: {
                body: "Bad tweet"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        createTweetService.mockRejectedValue({
            status: 400,
            message: "Tweet contains blocked words"
        });

        await createTweet(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Tweet contains blocked words"
        });
    });

    test("returns 500 for unexpected errors", async () => {
        const req = {
            body: {
                body: "Some tweet"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        createTweetService.mockRejectedValue(new Error("Database failed"));

        await createTweet(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Internal server error"
        });
    });
});