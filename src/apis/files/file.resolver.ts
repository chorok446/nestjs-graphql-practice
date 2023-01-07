// import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { FileService } from './file.service';
// import { FileUpload } from 'graphql-upload/Upload';
// import GraphQLUpload from 'graphql-upload/GraphQLUpload';
//
// @Resolver()
// export class FileResolver {
//     constructor(
//         private readonly fileService: FileService, //
//     ) {}
//
//     @Mutation(() => [String])
//     uploadFile(
//         @Args({ name: 'files', type: () => [GraphQLUpload] })
//         files: FileUpload[],
//     ) {
//         return this.fileService.upload({ files });
//     }
// }
