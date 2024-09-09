import { ArgumentMetadata, ParseEnumPipe } from "@nestjs/common";
export declare class OptionalEnumUUIDPipe<T = any> extends ParseEnumPipe<T> {
    transform(value: T, metadata: ArgumentMetadata): Promise<T>;
}
