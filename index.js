// https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions
const { Octokit } = require("@octokit/core");
require("dotenv").config()

SECRET_TOKEN                   = process.env.SECRET_TOKEN
SECRET_TOKEN_VALIDATOR_ACCOUNT = process.env.SECRET_TOKEN_VALIDATOR_ACCOUNT
OWNER = process.env.OWNER
REPO = process.env.REPO
TIER = process.env.TIER // x1: 2, x2:8, x3: 16, x4: 32

// Declarer octokit pour les 2 comptes
const octokit                 = new Octokit({ auth: SECRET_TOKEN })
const octokitValidatorAccount = new Octokit({ auth: SECRET_TOKEN_VALIDATOR_ACCOUNT })

// STRUCTURE GOLBAL
/*
 * Get repositoryId and categoryId
 * For i in 32:
 * 	createDiscussion(repositoryId, categoryId, TextData, TextData)
 * 	addDiscussionComment
 * 	markDiscussionCommentAsAnswer avec l'autre compte
 */


async function main(){

	let TextData = "TEST N°8.-1"

	// Get: repositoryId, categoryId
	let response = await octokit.graphql(
		`query MyQuery {
		  repository(name: "${REPO}", owner: "${OWNER}") {
		    id
		    discussionCategories(first: 10) {
		      nodes {
			id
			isAnswerable
			name
		      }
		    }
		    databaseId
		  }
		}
		`
	)
	const repositoryId = response.repository.id
	let nodes = response.repository.discussionCategories.nodes
	node = nodes.find(it => it.name === "Q&A")
	const categoryId = node.id

	// For i in range(TIER) 
	for (let i = 1; i <= TIER; i++) {
		TextData = `Iteration n°${i} of ${TIER}`
		// createDiscussion: repositoryId, categoryId -> discussionId
		let createDiscussionInput = createDiscussion(repositoryId, categoryId, TextData, TextData)
		response = await octokit.graphql(
			createDiscussionInput
		)
		const discussionId = response.createDiscussion.discussion.id

		// addDiscussionComment: discussionId -> commentId
		let addDiscussionCommentInput = addDiscussionComment(discussionId, TextData)
		response = await octokit.graphql(
			addDiscussionCommentInput
		)

		const commentId = response.addDiscussionComment.comment.id


		// markDiscussionCommentAsAnswer: commentId -> None 
		let markDiscussionCommentAsAnswerInput = markDiscussionCommentAsAnswer(commentId)

		response = await octokitValidatorAccount.graphql(
			markDiscussionCommentAsAnswerInput
		)
		// Verify if all works
		console.table([[repositoryId, categoryId, discussionId, commentId, i], ["repositoryId", "categoryId", "discussionId", "commentId", "iteration n°"]])

	}
}

function createDiscussion(repositoryId, categoryId, body="The body", title="The title"){
	return `mutation {
	  createDiscussion(input: {repositoryId: "${repositoryId}", categoryId: "${categoryId}", body: "${body}", title: "${title}"}) {
	    discussion {
	      id
	    }
	  }
	}`
}


function addDiscussionComment(discussionId, body="The body"){
	return `mutation {
	  addDiscussionComment(input: {discussionId: "${discussionId}", body: "${body}"}) {
	    comment {
	      id
	    }
	  }
	}`
}
function markDiscussionCommentAsAnswer(commentId){
	return `mutation {
	  markDiscussionCommentAsAnswer(input: {id: "${commentId}"}) {
	    discussion {
	      id
	    }
	  }
	}`
}

main()
