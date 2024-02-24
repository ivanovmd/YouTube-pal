import { IcpMainEventDispatcher } from "../base/icpMainEventDispatcher";
import { DOWNLOAD_FILE_OPERATION, NAMESPACE } from "./constants";

const downloadFileEventDispatcher = new IcpMainEventDispatcher(NAMESPACE, DOWNLOAD_FILE_OPERATION)