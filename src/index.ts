import { getEnv, octokit } from './libs/index.js'
import './cli.js'

// const res = await octokit.graphql(
//   `{
//     nodes(ids: ["I_kwDOIqaxms5eAdRI"]) {
//       ... on Issue {
//         id
//         number
//         title
//         trackedInIssues(first: 10) {
//           nodes {
//             id
//             number
//             title
//             projectItems(first: 10) {
//               nodes {
//                 ... on ProjectV2Item {
//                   fieldValues(first: 10) {
//                     nodes {
//                       ... on ProjectV2ItemFieldSingleSelectValue {
//                         field {
//                           ... on ProjectV2SingleSelectField {
//                             name
//                           }
//                         }
//                         name
//                         optionId
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }`,
//   // { login: 'octokit' },
// )

// console.log(res)
