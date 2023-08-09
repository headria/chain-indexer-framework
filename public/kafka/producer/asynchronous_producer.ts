import { AsynchronousProducer as InternalAsynchronousProducer } from "@internal/kafka/producer/asynchronous_producer.js";
import { IProducerConfig } from "@internal/interfaces/producer_config.js";
import { ICoder } from "@internal/interfaces/coder.js";
import { Coder } from "@internal/coder/protobuf_coder.js";
import { ICoderConfig } from "@internal/interfaces/coder_config.js";

/**
 * AsynchronousProducer class entends InternalAsynchronousProducer which creates an instance of AsynchronousProducer
 * it abstracts the usage of coder class internally. serialiser can be passed optionally if another type of
 * serialising/deserialising is required.
 */
export class AsynchronousProducer extends InternalAsynchronousProducer {
    /**
     *
     * @param {IProducerConfig} config - key value pairs to override the default config of the producer client.
     */
    constructor(
        config: IProducerConfig
    ) {
        let coder = config.coder;
        delete config.coder;

        if (!coder) {
            throw new Error("Please provide coder"); 
        }

        if ("fileName" in coder) {
            coder = new Coder(
                (coder as ICoderConfig).fileName,
                (coder as ICoderConfig).packageName,
                (coder as ICoderConfig).messageType,
                (coder as ICoderConfig).fileDirectory,
            );
        }

        super(
            coder as ICoder,
            config
        );
    }
}
