import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type PredictionMarket$Data = {
    $$type: 'PredictionMarket$Data';
    factory: Address;
    creator: Address;
    pubkey: bigint;
    usedNonces: Dictionary<bigint, boolean>;
    marketId: bigint;
    resolutionTime: bigint;
    startTime: bigint;
    resolved: boolean;
    winningOutcome: bigint | null;
    yesShares: Dictionary<Address, bigint>;
    noShares: Dictionary<Address, bigint>;
    totalYesShareCount: bigint;
    totalNoShareCount: bigint;
    paused: boolean;
}

export function storePredictionMarket$Data(src: PredictionMarket$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.factory);
        b_0.storeAddress(src.creator);
        b_0.storeUint(src.pubkey, 256);
        b_0.storeDict(src.usedNonces, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool());
        const b_1 = new Builder();
        b_1.storeInt(src.marketId, 257);
        b_1.storeUint(src.resolutionTime, 32);
        b_1.storeUint(src.startTime, 32);
        b_1.storeBit(src.resolved);
        if (src.winningOutcome !== null && src.winningOutcome !== undefined) { b_1.storeBit(true).storeInt(src.winningOutcome, 257); } else { b_1.storeBit(false); }
        b_1.storeDict(src.yesShares, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_1.storeDict(src.noShares, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_1.storeInt(src.totalYesShareCount, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.totalNoShareCount, 257);
        b_2.storeBit(src.paused);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPredictionMarket$Data(slice: Slice) {
    const sc_0 = slice;
    const _factory = sc_0.loadAddress();
    const _creator = sc_0.loadAddress();
    const _pubkey = sc_0.loadUintBig(256);
    const _usedNonces = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _marketId = sc_1.loadIntBig(257);
    const _resolutionTime = sc_1.loadUintBig(32);
    const _startTime = sc_1.loadUintBig(32);
    const _resolved = sc_1.loadBit();
    const _winningOutcome = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const _yesShares = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_1);
    const _noShares = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_1);
    const _totalYesShareCount = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _totalNoShareCount = sc_2.loadIntBig(257);
    const _paused = sc_2.loadBit();
    return { $$type: 'PredictionMarket$Data' as const, factory: _factory, creator: _creator, pubkey: _pubkey, usedNonces: _usedNonces, marketId: _marketId, resolutionTime: _resolutionTime, startTime: _startTime, resolved: _resolved, winningOutcome: _winningOutcome, yesShares: _yesShares, noShares: _noShares, totalYesShareCount: _totalYesShareCount, totalNoShareCount: _totalNoShareCount, paused: _paused };
}

export function loadTuplePredictionMarket$Data(source: TupleReader) {
    const _factory = source.readAddress();
    const _creator = source.readAddress();
    const _pubkey = source.readBigNumber();
    const _usedNonces = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), source.readCellOpt());
    const _marketId = source.readBigNumber();
    const _resolutionTime = source.readBigNumber();
    const _startTime = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _winningOutcome = source.readBigNumberOpt();
    const _yesShares = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _noShares = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _totalYesShareCount = source.readBigNumber();
    const _totalNoShareCount = source.readBigNumber();
    const _paused = source.readBoolean();
    return { $$type: 'PredictionMarket$Data' as const, factory: _factory, creator: _creator, pubkey: _pubkey, usedNonces: _usedNonces, marketId: _marketId, resolutionTime: _resolutionTime, startTime: _startTime, resolved: _resolved, winningOutcome: _winningOutcome, yesShares: _yesShares, noShares: _noShares, totalYesShareCount: _totalYesShareCount, totalNoShareCount: _totalNoShareCount, paused: _paused };
}

export function loadGetterTuplePredictionMarket$Data(source: TupleReader) {
    const _factory = source.readAddress();
    const _creator = source.readAddress();
    const _pubkey = source.readBigNumber();
    const _usedNonces = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), source.readCellOpt());
    const _marketId = source.readBigNumber();
    const _resolutionTime = source.readBigNumber();
    const _startTime = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _winningOutcome = source.readBigNumberOpt();
    const _yesShares = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _noShares = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _totalYesShareCount = source.readBigNumber();
    const _totalNoShareCount = source.readBigNumber();
    const _paused = source.readBoolean();
    return { $$type: 'PredictionMarket$Data' as const, factory: _factory, creator: _creator, pubkey: _pubkey, usedNonces: _usedNonces, marketId: _marketId, resolutionTime: _resolutionTime, startTime: _startTime, resolved: _resolved, winningOutcome: _winningOutcome, yesShares: _yesShares, noShares: _noShares, totalYesShareCount: _totalYesShareCount, totalNoShareCount: _totalNoShareCount, paused: _paused };
}

export function storeTuplePredictionMarket$Data(source: PredictionMarket$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.factory);
    builder.writeAddress(source.creator);
    builder.writeNumber(source.pubkey);
    builder.writeCell(source.usedNonces.size > 0 ? beginCell().storeDictDirect(source.usedNonces, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.marketId);
    builder.writeNumber(source.resolutionTime);
    builder.writeNumber(source.startTime);
    builder.writeBoolean(source.resolved);
    builder.writeNumber(source.winningOutcome);
    builder.writeCell(source.yesShares.size > 0 ? beginCell().storeDictDirect(source.yesShares, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.noShares.size > 0 ? beginCell().storeDictDirect(source.noShares, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.totalYesShareCount);
    builder.writeNumber(source.totalNoShareCount);
    builder.writeBoolean(source.paused);
    return builder.build();
}

export function dictValueParserPredictionMarket$Data(): DictionaryValue<PredictionMarket$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePredictionMarket$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPredictionMarket$Data(src.loadRef().beginParse());
        }
    }
}

export type CreatePredictionMarket = {
    $$type: 'CreatePredictionMarket';
    marketId: bigint;
    creator: Address;
    resolutionTime: bigint;
}

export function storeCreatePredictionMarket(src: CreatePredictionMarket) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4280606372, 32);
        b_0.storeInt(src.marketId, 257);
        b_0.storeAddress(src.creator);
        b_0.storeInt(src.resolutionTime, 257);
    };
}

export function loadCreatePredictionMarket(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4280606372) { throw Error('Invalid prefix'); }
    const _marketId = sc_0.loadIntBig(257);
    const _creator = sc_0.loadAddress();
    const _resolutionTime = sc_0.loadIntBig(257);
    return { $$type: 'CreatePredictionMarket' as const, marketId: _marketId, creator: _creator, resolutionTime: _resolutionTime };
}

export function loadTupleCreatePredictionMarket(source: TupleReader) {
    const _marketId = source.readBigNumber();
    const _creator = source.readAddress();
    const _resolutionTime = source.readBigNumber();
    return { $$type: 'CreatePredictionMarket' as const, marketId: _marketId, creator: _creator, resolutionTime: _resolutionTime };
}

export function loadGetterTupleCreatePredictionMarket(source: TupleReader) {
    const _marketId = source.readBigNumber();
    const _creator = source.readAddress();
    const _resolutionTime = source.readBigNumber();
    return { $$type: 'CreatePredictionMarket' as const, marketId: _marketId, creator: _creator, resolutionTime: _resolutionTime };
}

export function storeTupleCreatePredictionMarket(source: CreatePredictionMarket) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.marketId);
    builder.writeAddress(source.creator);
    builder.writeNumber(source.resolutionTime);
    return builder.build();
}

export function dictValueParserCreatePredictionMarket(): DictionaryValue<CreatePredictionMarket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreatePredictionMarket(src)).endCell());
        },
        parse: (src) => {
            return loadCreatePredictionMarket(src.loadRef().beginParse());
        }
    }
}

export type ChangeAdmin = {
    $$type: 'ChangeAdmin';
    newOwner: Address;
}

export function storeChangeAdmin(src: ChangeAdmin) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(636739454, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeAdmin(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 636739454) { throw Error('Invalid prefix'); }
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeAdmin' as const, newOwner: _newOwner };
}

export function loadTupleChangeAdmin(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeAdmin' as const, newOwner: _newOwner };
}

export function loadGetterTupleChangeAdmin(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeAdmin' as const, newOwner: _newOwner };
}

export function storeTupleChangeAdmin(source: ChangeAdmin) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeAdmin(): DictionaryValue<ChangeAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadChangeAdmin(src.loadRef().beginParse());
        }
    }
}

export type BuyShares = {
    $$type: 'BuyShares';
    nonce: bigint;
    signature: Slice;
    payload: Slice;
}

export function storeBuyShares(src: BuyShares) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3183853128, 32);
        b_0.storeInt(src.nonce, 257);
        b_0.storeRef(src.signature.asCell());
        b_0.storeRef(src.payload.asCell());
    };
}

export function loadBuyShares(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3183853128) { throw Error('Invalid prefix'); }
    const _nonce = sc_0.loadIntBig(257);
    const _signature = sc_0.loadRef().asSlice();
    const _payload = sc_0.loadRef().asSlice();
    return { $$type: 'BuyShares' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadTupleBuyShares(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'BuyShares' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadGetterTupleBuyShares(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'BuyShares' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function storeTupleBuyShares(source: BuyShares) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nonce);
    builder.writeSlice(source.signature.asCell());
    builder.writeSlice(source.payload.asCell());
    return builder.build();
}

export function dictValueParserBuyShares(): DictionaryValue<BuyShares> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyShares(src)).endCell());
        },
        parse: (src) => {
            return loadBuyShares(src.loadRef().beginParse());
        }
    }
}

export type SellShares = {
    $$type: 'SellShares';
    nonce: bigint;
    signature: Slice;
    payload: Slice;
}

export function storeSellShares(src: SellShares) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(224712432, 32);
        b_0.storeInt(src.nonce, 257);
        b_0.storeRef(src.signature.asCell());
        b_0.storeRef(src.payload.asCell());
    };
}

export function loadSellShares(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 224712432) { throw Error('Invalid prefix'); }
    const _nonce = sc_0.loadIntBig(257);
    const _signature = sc_0.loadRef().asSlice();
    const _payload = sc_0.loadRef().asSlice();
    return { $$type: 'SellShares' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadTupleSellShares(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'SellShares' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadGetterTupleSellShares(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'SellShares' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function storeTupleSellShares(source: SellShares) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nonce);
    builder.writeSlice(source.signature.asCell());
    builder.writeSlice(source.payload.asCell());
    return builder.build();
}

export function dictValueParserSellShares(): DictionaryValue<SellShares> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSellShares(src)).endCell());
        },
        parse: (src) => {
            return loadSellShares(src.loadRef().beginParse());
        }
    }
}

export type ClaimWinnings = {
    $$type: 'ClaimWinnings';
    nonce: bigint;
    signature: Slice;
    payload: Slice;
}

export function storeClaimWinnings(src: ClaimWinnings) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1853794368, 32);
        b_0.storeInt(src.nonce, 257);
        b_0.storeRef(src.signature.asCell());
        b_0.storeRef(src.payload.asCell());
    };
}

export function loadClaimWinnings(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1853794368) { throw Error('Invalid prefix'); }
    const _nonce = sc_0.loadIntBig(257);
    const _signature = sc_0.loadRef().asSlice();
    const _payload = sc_0.loadRef().asSlice();
    return { $$type: 'ClaimWinnings' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadTupleClaimWinnings(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'ClaimWinnings' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadGetterTupleClaimWinnings(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'ClaimWinnings' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function storeTupleClaimWinnings(source: ClaimWinnings) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nonce);
    builder.writeSlice(source.signature.asCell());
    builder.writeSlice(source.payload.asCell());
    return builder.build();
}

export function dictValueParserClaimWinnings(): DictionaryValue<ClaimWinnings> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimWinnings(src)).endCell());
        },
        parse: (src) => {
            return loadClaimWinnings(src.loadRef().beginParse());
        }
    }
}

export type WithdrawTon = {
    $$type: 'WithdrawTon';
    nonce: bigint;
    signature: Slice;
    payload: Slice;
}

export function storeWithdrawTon(src: WithdrawTon) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3099721943, 32);
        b_0.storeInt(src.nonce, 257);
        b_0.storeRef(src.signature.asCell());
        b_0.storeRef(src.payload.asCell());
    };
}

export function loadWithdrawTon(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3099721943) { throw Error('Invalid prefix'); }
    const _nonce = sc_0.loadIntBig(257);
    const _signature = sc_0.loadRef().asSlice();
    const _payload = sc_0.loadRef().asSlice();
    return { $$type: 'WithdrawTon' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadTupleWithdrawTon(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'WithdrawTon' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function loadGetterTupleWithdrawTon(source: TupleReader) {
    const _nonce = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell().asSlice();
    return { $$type: 'WithdrawTon' as const, nonce: _nonce, signature: _signature, payload: _payload };
}

export function storeTupleWithdrawTon(source: WithdrawTon) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nonce);
    builder.writeSlice(source.signature.asCell());
    builder.writeSlice(source.payload.asCell());
    return builder.build();
}

export function dictValueParserWithdrawTon(): DictionaryValue<WithdrawTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawTon(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawTon(src.loadRef().beginParse());
        }
    }
}

export type SharesBought = {
    $$type: 'SharesBought';
    user: Address;
    outcome: bigint;
    amount: bigint;
    price: bigint;
}

export function storeSharesBought(src: SharesBought) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(692186916, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.outcome, 257);
        b_0.storeInt(src.amount, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.price, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSharesBought(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 692186916) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _outcome = sc_0.loadIntBig(257);
    const _amount = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _price = sc_1.loadIntBig(257);
    return { $$type: 'SharesBought' as const, user: _user, outcome: _outcome, amount: _amount, price: _price };
}

export function loadTupleSharesBought(source: TupleReader) {
    const _user = source.readAddress();
    const _outcome = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _price = source.readBigNumber();
    return { $$type: 'SharesBought' as const, user: _user, outcome: _outcome, amount: _amount, price: _price };
}

export function loadGetterTupleSharesBought(source: TupleReader) {
    const _user = source.readAddress();
    const _outcome = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _price = source.readBigNumber();
    return { $$type: 'SharesBought' as const, user: _user, outcome: _outcome, amount: _amount, price: _price };
}

export function storeTupleSharesBought(source: SharesBought) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.outcome);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.price);
    return builder.build();
}

export function dictValueParserSharesBought(): DictionaryValue<SharesBought> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSharesBought(src)).endCell());
        },
        parse: (src) => {
            return loadSharesBought(src.loadRef().beginParse());
        }
    }
}

export type SharesSold = {
    $$type: 'SharesSold';
    user: Address;
    outcome: bigint;
    amount: bigint;
    payout: bigint;
}

export function storeSharesSold(src: SharesSold) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3793246814, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.outcome, 257);
        b_0.storeInt(src.amount, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.payout, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSharesSold(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3793246814) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _outcome = sc_0.loadIntBig(257);
    const _amount = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _payout = sc_1.loadIntBig(257);
    return { $$type: 'SharesSold' as const, user: _user, outcome: _outcome, amount: _amount, payout: _payout };
}

export function loadTupleSharesSold(source: TupleReader) {
    const _user = source.readAddress();
    const _outcome = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _payout = source.readBigNumber();
    return { $$type: 'SharesSold' as const, user: _user, outcome: _outcome, amount: _amount, payout: _payout };
}

export function loadGetterTupleSharesSold(source: TupleReader) {
    const _user = source.readAddress();
    const _outcome = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _payout = source.readBigNumber();
    return { $$type: 'SharesSold' as const, user: _user, outcome: _outcome, amount: _amount, payout: _payout };
}

export function storeTupleSharesSold(source: SharesSold) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.outcome);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.payout);
    return builder.build();
}

export function dictValueParserSharesSold(): DictionaryValue<SharesSold> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSharesSold(src)).endCell());
        },
        parse: (src) => {
            return loadSharesSold(src.loadRef().beginParse());
        }
    }
}

export type TonWithdrawn = {
    $$type: 'TonWithdrawn';
    user: Address;
    amount: bigint;
}

export function storeTonWithdrawn(src: TonWithdrawn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2914015197, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadTonWithdrawn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2914015197) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _amount = sc_0.loadIntBig(257);
    return { $$type: 'TonWithdrawn' as const, user: _user, amount: _amount };
}

export function loadTupleTonWithdrawn(source: TupleReader) {
    const _user = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'TonWithdrawn' as const, user: _user, amount: _amount };
}

export function loadGetterTupleTonWithdrawn(source: TupleReader) {
    const _user = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'TonWithdrawn' as const, user: _user, amount: _amount };
}

export function storeTupleTonWithdrawn(source: TonWithdrawn) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserTonWithdrawn(): DictionaryValue<TonWithdrawn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTonWithdrawn(src)).endCell());
        },
        parse: (src) => {
            return loadTonWithdrawn(src.loadRef().beginParse());
        }
    }
}

export type WinningsClaimed = {
    $$type: 'WinningsClaimed';
    amount: bigint;
    user: Address;
}

export function storeWinningsClaimed(src: WinningsClaimed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(154536578, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.user);
    };
}

export function loadWinningsClaimed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 154536578) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadIntBig(257);
    const _user = sc_0.loadAddress();
    return { $$type: 'WinningsClaimed' as const, amount: _amount, user: _user };
}

export function loadTupleWinningsClaimed(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _user = source.readAddress();
    return { $$type: 'WinningsClaimed' as const, amount: _amount, user: _user };
}

export function loadGetterTupleWinningsClaimed(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _user = source.readAddress();
    return { $$type: 'WinningsClaimed' as const, amount: _amount, user: _user };
}

export function storeTupleWinningsClaimed(source: WinningsClaimed) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.user);
    return builder.build();
}

export function dictValueParserWinningsClaimed(): DictionaryValue<WinningsClaimed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWinningsClaimed(src)).endCell());
        },
        parse: (src) => {
            return loadWinningsClaimed(src.loadRef().beginParse());
        }
    }
}

export type PredictionMarketCreated = {
    $$type: 'PredictionMarketCreated';
    marketAddress: Address;
    creator: Address;
    resolutionTime: bigint;
}

export function storePredictionMarketCreated(src: PredictionMarketCreated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1339730309, 32);
        b_0.storeAddress(src.marketAddress);
        b_0.storeAddress(src.creator);
        b_0.storeInt(src.resolutionTime, 257);
    };
}

export function loadPredictionMarketCreated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1339730309) { throw Error('Invalid prefix'); }
    const _marketAddress = sc_0.loadAddress();
    const _creator = sc_0.loadAddress();
    const _resolutionTime = sc_0.loadIntBig(257);
    return { $$type: 'PredictionMarketCreated' as const, marketAddress: _marketAddress, creator: _creator, resolutionTime: _resolutionTime };
}

export function loadTuplePredictionMarketCreated(source: TupleReader) {
    const _marketAddress = source.readAddress();
    const _creator = source.readAddress();
    const _resolutionTime = source.readBigNumber();
    return { $$type: 'PredictionMarketCreated' as const, marketAddress: _marketAddress, creator: _creator, resolutionTime: _resolutionTime };
}

export function loadGetterTuplePredictionMarketCreated(source: TupleReader) {
    const _marketAddress = source.readAddress();
    const _creator = source.readAddress();
    const _resolutionTime = source.readBigNumber();
    return { $$type: 'PredictionMarketCreated' as const, marketAddress: _marketAddress, creator: _creator, resolutionTime: _resolutionTime };
}

export function storeTuplePredictionMarketCreated(source: PredictionMarketCreated) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.marketAddress);
    builder.writeAddress(source.creator);
    builder.writeNumber(source.resolutionTime);
    return builder.build();
}

export function dictValueParserPredictionMarketCreated(): DictionaryValue<PredictionMarketCreated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePredictionMarketCreated(src)).endCell());
        },
        parse: (src) => {
            return loadPredictionMarketCreated(src.loadRef().beginParse());
        }
    }
}

export type UpdateBackendSigner = {
    $$type: 'UpdateBackendSigner';
    newPubKey: bigint;
}

export function storeUpdateBackendSigner(src: UpdateBackendSigner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4273401544, 32);
        b_0.storeInt(src.newPubKey, 257);
    };
}

export function loadUpdateBackendSigner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4273401544) { throw Error('Invalid prefix'); }
    const _newPubKey = sc_0.loadIntBig(257);
    return { $$type: 'UpdateBackendSigner' as const, newPubKey: _newPubKey };
}

export function loadTupleUpdateBackendSigner(source: TupleReader) {
    const _newPubKey = source.readBigNumber();
    return { $$type: 'UpdateBackendSigner' as const, newPubKey: _newPubKey };
}

export function loadGetterTupleUpdateBackendSigner(source: TupleReader) {
    const _newPubKey = source.readBigNumber();
    return { $$type: 'UpdateBackendSigner' as const, newPubKey: _newPubKey };
}

export function storeTupleUpdateBackendSigner(source: UpdateBackendSigner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.newPubKey);
    return builder.build();
}

export function dictValueParserUpdateBackendSigner(): DictionaryValue<UpdateBackendSigner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateBackendSigner(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBackendSigner(src.loadRef().beginParse());
        }
    }
}

export type PauseMarket = {
    $$type: 'PauseMarket';
}

export function storePauseMarket(src: PauseMarket) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2803987918, 32);
    };
}

export function loadPauseMarket(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2803987918) { throw Error('Invalid prefix'); }
    return { $$type: 'PauseMarket' as const };
}

export function loadTuplePauseMarket(source: TupleReader) {
    return { $$type: 'PauseMarket' as const };
}

export function loadGetterTuplePauseMarket(source: TupleReader) {
    return { $$type: 'PauseMarket' as const };
}

export function storeTuplePauseMarket(source: PauseMarket) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserPauseMarket(): DictionaryValue<PauseMarket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePauseMarket(src)).endCell());
        },
        parse: (src) => {
            return loadPauseMarket(src.loadRef().beginParse());
        }
    }
}

export type ResumeMarket = {
    $$type: 'ResumeMarket';
}

export function storeResumeMarket(src: ResumeMarket) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2890804557, 32);
    };
}

export function loadResumeMarket(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2890804557) { throw Error('Invalid prefix'); }
    return { $$type: 'ResumeMarket' as const };
}

export function loadTupleResumeMarket(source: TupleReader) {
    return { $$type: 'ResumeMarket' as const };
}

export function loadGetterTupleResumeMarket(source: TupleReader) {
    return { $$type: 'ResumeMarket' as const };
}

export function storeTupleResumeMarket(source: ResumeMarket) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserResumeMarket(): DictionaryValue<ResumeMarket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResumeMarket(src)).endCell());
        },
        parse: (src) => {
            return loadResumeMarket(src.loadRef().beginParse());
        }
    }
}

export type SetWinningOutcome = {
    $$type: 'SetWinningOutcome';
    winningOutcome: bigint;
}

export function storeSetWinningOutcome(src: SetWinningOutcome) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3801148021, 32);
        b_0.storeInt(src.winningOutcome, 257);
    };
}

export function loadSetWinningOutcome(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3801148021) { throw Error('Invalid prefix'); }
    const _winningOutcome = sc_0.loadIntBig(257);
    return { $$type: 'SetWinningOutcome' as const, winningOutcome: _winningOutcome };
}

export function loadTupleSetWinningOutcome(source: TupleReader) {
    const _winningOutcome = source.readBigNumber();
    return { $$type: 'SetWinningOutcome' as const, winningOutcome: _winningOutcome };
}

export function loadGetterTupleSetWinningOutcome(source: TupleReader) {
    const _winningOutcome = source.readBigNumber();
    return { $$type: 'SetWinningOutcome' as const, winningOutcome: _winningOutcome };
}

export function storeTupleSetWinningOutcome(source: SetWinningOutcome) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.winningOutcome);
    return builder.build();
}

export function dictValueParserSetWinningOutcome(): DictionaryValue<SetWinningOutcome> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetWinningOutcome(src)).endCell());
        },
        parse: (src) => {
            return loadSetWinningOutcome(src.loadRef().beginParse());
        }
    }
}

export type MarketInfo = {
    $$type: 'MarketInfo';
    marketId: bigint;
    creator: Address;
    resolutionTime: bigint;
    resolved: boolean;
    winningOutcome: bigint | null;
}

export function storeMarketInfo(src: MarketInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.marketId, 257);
        b_0.storeAddress(src.creator);
        b_0.storeInt(src.resolutionTime, 257);
        b_0.storeBit(src.resolved);
        const b_1 = new Builder();
        if (src.winningOutcome !== null && src.winningOutcome !== undefined) { b_1.storeBit(true).storeInt(src.winningOutcome, 257); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketInfo(slice: Slice) {
    const sc_0 = slice;
    const _marketId = sc_0.loadIntBig(257);
    const _creator = sc_0.loadAddress();
    const _resolutionTime = sc_0.loadIntBig(257);
    const _resolved = sc_0.loadBit();
    const sc_1 = sc_0.loadRef().beginParse();
    const _winningOutcome = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    return { $$type: 'MarketInfo' as const, marketId: _marketId, creator: _creator, resolutionTime: _resolutionTime, resolved: _resolved, winningOutcome: _winningOutcome };
}

export function loadTupleMarketInfo(source: TupleReader) {
    const _marketId = source.readBigNumber();
    const _creator = source.readAddress();
    const _resolutionTime = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _winningOutcome = source.readBigNumberOpt();
    return { $$type: 'MarketInfo' as const, marketId: _marketId, creator: _creator, resolutionTime: _resolutionTime, resolved: _resolved, winningOutcome: _winningOutcome };
}

export function loadGetterTupleMarketInfo(source: TupleReader) {
    const _marketId = source.readBigNumber();
    const _creator = source.readAddress();
    const _resolutionTime = source.readBigNumber();
    const _resolved = source.readBoolean();
    const _winningOutcome = source.readBigNumberOpt();
    return { $$type: 'MarketInfo' as const, marketId: _marketId, creator: _creator, resolutionTime: _resolutionTime, resolved: _resolved, winningOutcome: _winningOutcome };
}

export function storeTupleMarketInfo(source: MarketInfo) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.marketId);
    builder.writeAddress(source.creator);
    builder.writeNumber(source.resolutionTime);
    builder.writeBoolean(source.resolved);
    builder.writeNumber(source.winningOutcome);
    return builder.build();
}

export function dictValueParserMarketInfo(): DictionaryValue<MarketInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketInfo(src)).endCell());
        },
        parse: (src) => {
            return loadMarketInfo(src.loadRef().beginParse());
        }
    }
}

export type PredictionFactory$Data = {
    $$type: 'PredictionFactory$Data';
    nonces: Dictionary<bigint, bigint>;
    owner: Address;
    createdMarkets: Dictionary<bigint, Address>;
    totalMarkets: bigint;
}

export function storePredictionFactory$Data(src: PredictionFactory$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.nonces, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeAddress(src.owner);
        b_0.storeDict(src.createdMarkets, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeUint(src.totalMarkets, 64);
    };
}

export function loadPredictionFactory$Data(slice: Slice) {
    const sc_0 = slice;
    const _nonces = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    const _owner = sc_0.loadAddress();
    const _createdMarkets = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    const _totalMarkets = sc_0.loadUintBig(64);
    return { $$type: 'PredictionFactory$Data' as const, nonces: _nonces, owner: _owner, createdMarkets: _createdMarkets, totalMarkets: _totalMarkets };
}

export function loadTuplePredictionFactory$Data(source: TupleReader) {
    const _nonces = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _owner = source.readAddress();
    const _createdMarkets = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _totalMarkets = source.readBigNumber();
    return { $$type: 'PredictionFactory$Data' as const, nonces: _nonces, owner: _owner, createdMarkets: _createdMarkets, totalMarkets: _totalMarkets };
}

export function loadGetterTuplePredictionFactory$Data(source: TupleReader) {
    const _nonces = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _owner = source.readAddress();
    const _createdMarkets = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _totalMarkets = source.readBigNumber();
    return { $$type: 'PredictionFactory$Data' as const, nonces: _nonces, owner: _owner, createdMarkets: _createdMarkets, totalMarkets: _totalMarkets };
}

export function storeTuplePredictionFactory$Data(source: PredictionFactory$Data) {
    const builder = new TupleBuilder();
    builder.writeCell(source.nonces.size > 0 ? beginCell().storeDictDirect(source.nonces, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeAddress(source.owner);
    builder.writeCell(source.createdMarkets.size > 0 ? beginCell().storeDictDirect(source.createdMarkets, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.totalMarkets);
    return builder.build();
}

export function dictValueParserPredictionFactory$Data(): DictionaryValue<PredictionFactory$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePredictionFactory$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPredictionFactory$Data(src.loadRef().beginParse());
        }
    }
}

 type PredictionFactory_init_args = {
    $$type: 'PredictionFactory_init_args';
    _owner: Address;
}

function initPredictionFactory_init_args(src: PredictionFactory_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src._owner);
    };
}

async function PredictionFactory_init(_owner: Address) {
    const __code = Cell.fromHex('b5ee9c7241024f010013ac000228ff008e88f4a413f4bcf2c80bed5320e303ed43d9010b02027102070201660305014db1a07b5134348000673d013e903d0134cfd54c1b05267e900040745b405b5c389548f6cf1b1060040166f8284033db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d00e0149b18b7b5134348000673d013e903d0134cfd54c1b05267e900040745b405b5c38b6cf1b1060060004f828020120080a014dbb3c1ed44d0d200019cf404fa40f404d33f55306c1499fa400101d16d016d70e25503db3c6c418090078705333810101f4846fa520911295316d326d01e231908e1f325312ba917f9170e281010154421459f4786fa520911295316d326d01e231e810235f030149b8dfaed44d0d200019cf404fa40f404d33f55306c1499fa400101d16d016d70e2db3c6c4182a03d83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200019cf404fa40f404d33f55306c1499fa400101d16d016d70e205925f05e07024d74920c21f953104d31f05de218210ff24dea4bae30221821025f3df7ebae30235c00004c12114b0e3025f04f2c0820c4d4e01705b03810101d700fa40810101d70030810aeaf84225c705f2f4f82810571046104559db3c30c87f01ca0055305034f400cef400cb3fc9ed540d03f454533224db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d006a417810101541067206e953059f45a30944133f414e28209c9c38026037240130910246d4144037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae20e4b4c013488c87001ca0055315034810101cf00cece01c8810101cf00cdc90f0228ff008e88f4a413f4bcf2c80bed5320e303ed43d9102d020271111f020120121a020120131502cbb6ff3da89a1a400031ca7020203ae01f481f481a803a1020203ae006028866009a2aa0505e04b24a8ebdb64c1a4184007b597db4f8249e835536e0f080f78188d95fa9768c0dadadae040e0e1f04621782156211420f2a0acda8a2aa087c61aaa1bb678d9c302e14009c72c0028e2381010b26028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e030708e2381010b25028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e03070e2020158161802c7afdcf6a268690000c729c08080eb807d207d206a00e8408080eb80180a21980268aa81417812c92a3af6d93069061001ed65f6d3e0927a0d54db83c203de0623657ea5da3036b6b6b81038387c11885e08558845083ca82b36a28aa821f186ed9e3670c02e1700022102cbac6476a268690000c729c08080eb807d207d206a00e8408080eb80180a21980268aa81417812c92a3af6d93069061001ed65f6d3e0927a0d54db83c203de0623657ea5da3036b6b6b81038387c11885e08558845083ca82b36a28aa821f186aa86ed9e3670c02e19002e8101012c02714133f40c6fa19401d70030925b6de26eb30201201b1d02c7b5083da89a1a400031ca7020203ae01f481f481a803a1020203ae006028866009a2aa0505e04b24a8ebdb64c1a4184007b597db4f8249e835536e0f080f78188d95fa9768c0dadadae040e0e1f04621782156211420f2a0acda8a2aa087c61bb678d9c302e1c00022d02cbb7461da89a1a400031ca7020203ae01f481f481a803a1020203ae006028866009a2aa0505e04b24a8ebdb64c1a4184007b597db4f8249e835536e0f080f78188d95fa9768c0dadadae040e0e1f04621782156211420f2a0acda8a2aa087c61aaa1bb678d9c302e1e009c71c0028e2381010b26028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e030708e2381010b25028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e03070e20201202025020120212302c7b75bdda89a1a400031ca7020203ae01f481f481a803a1020203ae006028866009a2aa0505e04b24a8ebdb64c1a4184007b597db4f8249e835536e0f080f78188d95fa9768c0dadadae040e0e1f04621782156211420f2a0acda8a2aa087c61bb678d9c302e2200022702c7b7cd1da89a1a400031ca7020203ae01f481f481a803a1020203ae006028866009a2aa0505e04b24a8ebdb64c1a4184007b597db4f8249e835536e0f080f78188d95fa9768c0dadadae040e0e1f04621782156211420f2a0acda8a2aa087c61bb678d9cb02e24000a5479c85398020158262802c7b337bb51343480006394e0404075c03e903e9035007420404075c00c0510cc01345540a0bc0964951d7b6c9834830800f6b2fb69f0493d06aa6dc1e101ef0311b2bf52ed181b5b5b5c081c1c3e08c42f042ac422841e54159b51455410f8c376cf1b38602e27000220020120292b02c7ad2776a268690000c729c08080eb807d207d206a00e8408080eb80180a21980268aa81417812c92a3af6d93069061001ed65f6d3e0927a0d54db83c203de0623657ea5da3036b6b6b81038387c11885e08558845083ca82b36a28aa821f186ed9e3670c02e2a00022202c7ac1b76a268690000c729c08080eb807d207d206a00e8408080eb80180a21980268aa81417812c92a3af6d93069061001ed65f6d3e0927a0d54db83c203de0623657ea5da3036b6b6b81038387c11885e08558845083ca82b36a28aa821f186ed9e3670c02e2c0008f8276f1002f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e53810101d700fa40fa40d401d0810101d7003014433004d1550282f025925475edb260d20c2003dacbeda7c124f41aa9b7078407bc0c46cafd4bb4606d6d6d70207070f82310bc10ab108a107950566d45155043e30d0f925f0fe0702e2e2f0082fa40fa40d3fff404d401d0810101d700d31fd31fd200d2000195810101d700926d01e2f404f404810101d700d430d0810101d700d2003010ae10ad10ac10ab6c1e0464d74920c21f95310ed31f0fde218210bdc5be48bae3022182100d64d6f0bae3022182106e7ea840bae302218210b8c200d7ba30373e4201fc5b0d810101d700d401d001d430d08142c32c8101012559f40c6fa131b3f2f481516e28b3f2f48200de625611b3f2f4f82329a1812275511bbbf2f4fa40d31fd33ffa00308200e4a7f8425250c705f2f48200958b23c002917f9323c001e2f2f48200c54b21c200f2f48142a622c200f2f4c824cf165230cb1f5220cb3f213102f4fa025260cb3fc9f90050055610f91081256901f2f41d81010150057f71216e955b59f45a3098c801cf004133f442e210df5e3b0a109f08107f06105f04103f0201111001111156102f56115614db3c03111003102e11111fc8553082102941ef245005cb1f13ce810101cf00810101cf0001c8810101cf00cdc932360176f8416f24135f035222a8018200c86002bef2f40d11100d10cf10be0a11100a109f108e07111007106f105e04111004103f102e0111100151fe56113302fcc0028e2381010b26028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e030708e2381010b25028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e03070e21111c0028e2981010b11115610a01034021111021f810101216e955b59f4593098c801cf004133f441e250eda050cde30d3435004e81010b11115610a01035021111021f810101216e955b59f4593098c801cf004133f441e2502da0002610ad109c108b107a106910581047103640351400f4c88258c000000000000000000000000101cb67ccc970fb00109d108c107b106a1059104810374614503305c87f01ca0055d050dece1bce19cbff17f40005c8810101cf0014cb1f12cb1fca00216eb3997f01ca00810101cf00947032ca00e212f40012f40012810101cf0002c8810101cf0013ca00cdcdc9ed5401fa5b0d810101d700d401d001d430d08142c32c8101012559f40c6fa131b3f2f48200de625611b3f2f4816c9028b3f2f4fa40d31fd33ffa0030813b4bf8425250c705f2f48200958b23c002917f9323c001e2f2f4c824cf165230cb1f5220cb3f21fa025260cb3fc9f90050055610f91081256901f2f41d81010150057f713802fe216e955b59f45a3098c801cf004133f442e210df5e3b0a109f08107f06105f04103f0201111001111156102f56115614db3c03111003102e11111fc855308210e2185a5e5005cb1f13ce810101cf00810101cf0001c8810101cf00cdc9c88258c000000000000000000000000101cb67ccc970fb00109d108c107b106a1059393d01f20d11110d0c11100c10bf10ae0911110908111008107f106e0511110504111004103f102e01111101111053fec0028e2381010b26028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e030708e2381010b25028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e03070e23a02c08200a19b215614bef2f48200c054f8276f108208989680a15613bef2f45612a10fc0028e372e8e231381010b015610011110810101216e955b59f4593098c801cf004133f441e2111012a19d3e52e381010bf45930111012a1e240ffe30d50de3b3c00662e8e221481010b015610011110810101216e955b59f4593098c801cf004133f441e21110a19c3e52e481010bf459301110a1e20094706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00109d108c107b106a1059104810374605441400b0104810374614503305c87f01ca0055d050dece1bce19cbff17f40005c8810101cf0014cb1f12cb1fca00216eb3997f01ca00810101cf00947032ca00e212f40012f40012810101cf0002c8810101cf0013ca00cdcdc9ed5401f85b0d810101d700d401d001d430d08142c32c8101012559f40c6fa131b3f2f48200de625611b3f2f482009dec28c0fff2f48200e781276eb3f2f4fa408200f280f8425230c705f2f4fa003027206ef2d0800e11100e5e3c10bf0a11100a109f08111008107f06111006105f04111004103f02111102011112015611013f01f6c0028e2381010b26028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e030708e2381010b25028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e03070e281600421c200f2f4c85612cf165613fa02561101cb3fc9f9000111102df9108200bd1101f2f48200ed6ff8276f104001cc8208989680a15613bef2f41a8101010111107f71216e955b59f45a3098c801cf004133f442e224206ef2d08010df10ce10bd1c109b108a107910681057104610351024102356100201c0029a0681010bf459305035a19b0581010bf459305024a158e20253ef4101d4706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0050ef01c859821009360a825003cb1f810101cf00cec9c88258c000000000000000000000000101cb67ccc970fb0010bd551a4504f68edb5b0d810101d700d401d001d430d0815ae9f8422fc705f2f48142c32c8101012559f40c6fa131b3f2f4fa40fa0030c822cf1621fa0214cb3fc9f90054102df9108200bd1101f2f48200a9b3f8276f108208989680a123bef2f45301e0218210e290ea75bae302218210feb6eec8bae3023f208210a72175ceba4344464701d0706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001c8598210adb057dd5003cb1fce810101cf00c9c88258c000000000000000000000000101cb67ccc970fb0010bd551a4501905b350c810101d700308200c241f8422cc705f2f48200de622eb3f2f481793e046e14f2f48200958b23c002917f9323c001e2f2f410ac109b108a10791068105710467f061035551245009ec87f01ca0055d050dece1bce19cbff17f40005c8810101cf0014cb1f12cb1fca00216eb3997f01ca00810101cf00947032ca00e212f40012f40012810101cf0002c8810101cf0013ca00cdcdc9ed5400ea5b3a0c810101d700308159f6f8422cc705f2f410bd10ac0b108a107910681057104610354430c87f01ca0055d050dece1bce19cbff17f40005c8810101cf0014cb1f12cb1fca00216eb3997f01ca00810101cf00947032ca00e212f40012f40012810101cf0002c8810101cf0013ca00cdcdc9ed5403fe8e67303d8159f6f8422cc705f2f48200de7b0eb31ef2f4551a7fc87f01ca0055d050dece1bce19cbff17f40005c8810101cf0014cb1f12cb1fca00216eb3997f01ca00810101cf00947032ca00e212f40012f40012810101cf0002c8810101cf0013ca00cdcdc9ed54e0208210ac4e2d4dbae302c0000ec1211eb0e3025f0e48494a00ca303d8159f6f8422cc705f2f48160be500ef2f4551a70c87f01ca0055d050dece1bce19cbff17f40005c8810101cf0014cb1f12cb1fca00216eb3997f01ca00810101cf00947032ca00e212f40012f40012810101cf0002c8810101cf0013ca00cdcdc9ed5400c6f842c8cf8508ce70cf0b6ec98042fb0010bd551ac87f01ca0055d050dece1bce19cbff17f40005c8810101cf0014cb1f12cb1fca00216eb3997f01ca00810101cf00947032ca00e212f40012f40012810101cf0002c8810101cf0013ca00cdcdc9ed540006f2c082001a58cf8680cf8480f400f400cf81006ef400c901fb002302c8552082104fdaa9855004cb1f12cece810101cf00c9c88258c000000000000000000000000101cb67ccc970fb0001004e5b03fa40308200f41df8425003c70512f2f44003c87f01ca0055305034f400cef400cb3fc9ed54004af842c8cf8508ce70cf0b6ec98042fb004003c87f01ca0055305034f400cef400cb3fc9ed54fa6926b3');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initPredictionFactory_init_args({ $$type: 'PredictionFactory_init_args', _owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const PredictionFactory_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    2794: { message: "Unauthorized " },
    8821: { message: "Resolution time has passed" },
    9577: { message: "Invalid Signature" },
    15179: { message: "seller needs to be the sender" },
    17062: { message: "Invalid amount" },
    17091: { message: "Nonce already used" },
    20846: { message: "Market already resolved" },
    23030: { message: "Unauthorized method called" },
    23273: { message: "Not Authorized" },
    24580: { message: "No winning shares" },
    24766: { message: "Market Not Paused" },
    27792: { message: "Market already resolved, use ClaimWinnings" },
    31038: { message: "Already resolved" },
    38283: { message: "Invalid outcome" },
    40428: { message: "Market is not resolved" },
    41371: { message: "Insufficient share balance to sell" },
    43443: { message: "insufficient contract balance" },
    48401: { message: "Invalid signature" },
    49236: { message: "Insufficient contract liquidity" },
    49729: { message: "Unauthorized" },
    50507: { message: "Invalid price" },
    51296: { message: "Not enough Ton to buy shares" },
    56930: { message: "Market paused, check back later" },
    56955: { message: "Already paused" },
    58535: { message: "Buyer needs to be the sender" },
    59265: { message: "Winning outcome not set yet" },
    60783: { message: "Insufficient liquidity" },
    62080: { message: "User must be sender" },
    62493: { message: "You're not authorized to perform this operation" },
} as const

export const PredictionFactory_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Unauthorized ": 2794,
    "Resolution time has passed": 8821,
    "Invalid Signature": 9577,
    "seller needs to be the sender": 15179,
    "Invalid amount": 17062,
    "Nonce already used": 17091,
    "Market already resolved": 20846,
    "Unauthorized method called": 23030,
    "Not Authorized": 23273,
    "No winning shares": 24580,
    "Market Not Paused": 24766,
    "Market already resolved, use ClaimWinnings": 27792,
    "Already resolved": 31038,
    "Invalid outcome": 38283,
    "Market is not resolved": 40428,
    "Insufficient share balance to sell": 41371,
    "insufficient contract balance": 43443,
    "Invalid signature": 48401,
    "Insufficient contract liquidity": 49236,
    "Unauthorized": 49729,
    "Invalid price": 50507,
    "Not enough Ton to buy shares": 51296,
    "Market paused, check back later": 56930,
    "Already paused": 56955,
    "Buyer needs to be the sender": 58535,
    "Winning outcome not set yet": 59265,
    "Insufficient liquidity": 60783,
    "User must be sender": 62080,
    "You're not authorized to perform this operation": 62493,
} as const

const PredictionFactory_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"PredictionMarket$Data","header":null,"fields":[{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"creator","type":{"kind":"simple","type":"address","optional":false}},{"name":"pubkey","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"usedNonces","type":{"kind":"dict","key":"int","value":"bool"}},{"name":"marketId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"resolutionTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"resolved","type":{"kind":"simple","type":"bool","optional":false}},{"name":"winningOutcome","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"yesShares","type":{"kind":"dict","key":"address","value":"int"}},{"name":"noShares","type":{"kind":"dict","key":"address","value":"int"}},{"name":"totalYesShareCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalNoShareCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"paused","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CreatePredictionMarket","header":4280606372,"fields":[{"name":"marketId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"creator","type":{"kind":"simple","type":"address","optional":false}},{"name":"resolutionTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangeAdmin","header":636739454,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BuyShares","header":3183853128,"fields":[{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SellShares","header":224712432,"fields":[{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"ClaimWinnings","header":1853794368,"fields":[{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"WithdrawTon","header":3099721943,"fields":[{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SharesBought","header":692186916,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SharesSold","header":3793246814,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"payout","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TonWithdrawn","header":2914015197,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WinningsClaimed","header":154536578,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PredictionMarketCreated","header":1339730309,"fields":[{"name":"marketAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"creator","type":{"kind":"simple","type":"address","optional":false}},{"name":"resolutionTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateBackendSigner","header":4273401544,"fields":[{"name":"newPubKey","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PauseMarket","header":2803987918,"fields":[]},
    {"name":"ResumeMarket","header":2890804557,"fields":[]},
    {"name":"SetWinningOutcome","header":3801148021,"fields":[{"name":"winningOutcome","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MarketInfo","header":null,"fields":[{"name":"marketId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"creator","type":{"kind":"simple","type":"address","optional":false}},{"name":"resolutionTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"resolved","type":{"kind":"simple","type":"bool","optional":false}},{"name":"winningOutcome","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"PredictionFactory$Data","header":null,"fields":[{"name":"nonces","type":{"kind":"dict","key":"int","value":"int"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"createdMarkets","type":{"kind":"dict","key":"int","value":"address"}},{"name":"totalMarkets","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const PredictionFactory_opcodes = {
    "CreatePredictionMarket": 4280606372,
    "ChangeAdmin": 636739454,
    "BuyShares": 3183853128,
    "SellShares": 224712432,
    "ClaimWinnings": 1853794368,
    "WithdrawTon": 3099721943,
    "SharesBought": 692186916,
    "SharesSold": 3793246814,
    "TonWithdrawn": 2914015197,
    "WinningsClaimed": 154536578,
    "PredictionMarketCreated": 1339730309,
    "UpdateBackendSigner": 4273401544,
    "PauseMarket": 2803987918,
    "ResumeMarket": 2890804557,
    "SetWinningOutcome": 3801148021,
}

const PredictionFactory_getters: ABIGetter[] = [
    {"name":"predictionMarket","methodId":75393,"arguments":[{"name":"creator","type":{"kind":"simple","type":"address","optional":false}},{"name":"marketId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"resolutionTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"isMarketInitialized","methodId":111553,"arguments":[{"name":"marketId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"contractAddress","methodId":79405,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"Admin","methodId":118266,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const PredictionFactory_getterMapping: { [key: string]: string } = {
    'predictionMarket': 'getPredictionMarket',
    'isMarketInitialized': 'getIsMarketInitialized',
    'contractAddress': 'getContractAddress',
    'Admin': 'getAdmin',
}

const PredictionFactory_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreatePredictionMarket"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeAdmin"}},
]

export const gasForBurn = 6700n;
export const gasForTransfer = 10500n;
export const minTonsForStorage = 10000000n;
export const yesCode = 2n;
export const noCode = 1n;

export class PredictionFactory implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = PredictionFactory_errors_backward;
    public static readonly opcodes = PredictionFactory_opcodes;
    
    static async init(_owner: Address) {
        return await PredictionFactory_init(_owner);
    }
    
    static async fromInit(_owner: Address) {
        const __gen_init = await PredictionFactory_init(_owner);
        const address = contractAddress(0, __gen_init);
        return new PredictionFactory(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new PredictionFactory(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  PredictionFactory_types,
        getters: PredictionFactory_getters,
        receivers: PredictionFactory_receivers,
        errors: PredictionFactory_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreatePredictionMarket | null | ChangeAdmin) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreatePredictionMarket') {
            body = beginCell().store(storeCreatePredictionMarket(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeAdmin') {
            body = beginCell().store(storeChangeAdmin(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getPredictionMarket(provider: ContractProvider, creator: Address, marketId: bigint, resolutionTime: bigint) {
        const builder = new TupleBuilder();
        builder.writeAddress(creator);
        builder.writeNumber(marketId);
        builder.writeNumber(resolutionTime);
        const source = (await provider.get('predictionMarket', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getIsMarketInitialized(provider: ContractProvider, marketId: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(marketId);
        const source = (await provider.get('isMarketInitialized', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getContractAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('contractAddress', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getAdmin(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('Admin', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}