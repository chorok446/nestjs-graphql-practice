// updateProduct.input.ts

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input.dto';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

// 제네릭

// PickType(CreateProductInput, ["name", "price"])
// OmitType(CreateProductInput, ["description"])
