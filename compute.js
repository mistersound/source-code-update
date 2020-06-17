/******


COMPUTE 
@author: Junior DONGO


***************/

var readline = require('readline');
var Face = require('.').Face;
var Name = require('.').Name;
var Blob = require('.').Blob;
var Interest = require('.').Interest;
var Data = require('.').Data;

var SafeBag = require('.').SafeBag;
var KeyChain = require('.').KeyChain;
var KeyType = require('.').KeyType;
var ChronoSync2013 = require('.').ChronoSync2013;
var UnixTransport = require('.').UnixTransport;

const sh = require('shelljs');



var DEFAULT_RSA_PUBLIC_KEY_DER = new Buffer([
    0x30, 0x82, 0x01, 0x22, 0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01,
    0x01, 0x05, 0x00, 0x03, 0x82, 0x01, 0x0f, 0x00, 0x30, 0x82, 0x01, 0x0a, 0x02, 0x82, 0x01, 0x01,
    0x00, 0xb8, 0x09, 0xa7, 0x59, 0x82, 0x84, 0xec, 0x4f, 0x06, 0xfa, 0x1c, 0xb2, 0xe1, 0x38, 0x93,
    0x53, 0xbb, 0x7d, 0xd4, 0xac, 0x88, 0x1a, 0xf8, 0x25, 0x11, 0xe4, 0xfa, 0x1d, 0x61, 0x24, 0x5b,
    0x82, 0xca, 0xcd, 0x72, 0xce, 0xdb, 0x66, 0xb5, 0x8d, 0x54, 0xbd, 0xfb, 0x23, 0xfd, 0xe8, 0x8e,
    0xaf, 0xa7, 0xb3, 0x79, 0xbe, 0x94, 0xb5, 0xb7, 0xba, 0x17, 0xb6, 0x05, 0xae, 0xce, 0x43, 0xbe,
    0x3b, 0xce, 0x6e, 0xea, 0x07, 0xdb, 0xbf, 0x0a, 0x7e, 0xeb, 0xbc, 0xc9, 0x7b, 0x62, 0x3c, 0xf5,
    0xe1, 0xce, 0xe1, 0xd9, 0x8d, 0x9c, 0xfe, 0x1f, 0xc7, 0xf8, 0xfb, 0x59, 0xc0, 0x94, 0x0b, 0x2c,
    0xd9, 0x7d, 0xbc, 0x96, 0xeb, 0xb8, 0x79, 0x22, 0x8a, 0x2e, 0xa0, 0x12, 0x1d, 0x42, 0x07, 0xb6,
    0x5d, 0xdb, 0xe1, 0xf6, 0xb1, 0x5d, 0x7b, 0x1f, 0x54, 0x52, 0x1c, 0xa3, 0x11, 0x9b, 0xf9, 0xeb,
    0xbe, 0xb3, 0x95, 0xca, 0xa5, 0x87, 0x3f, 0x31, 0x18, 0x1a, 0xc9, 0x99, 0x01, 0xec, 0xaa, 0x90,
    0xfd, 0x8a, 0x36, 0x35, 0x5e, 0x12, 0x81, 0xbe, 0x84, 0x88, 0xa1, 0x0d, 0x19, 0x2a, 0x4a, 0x66,
    0xc1, 0x59, 0x3c, 0x41, 0x83, 0x3d, 0x3d, 0xb8, 0xd4, 0xab, 0x34, 0x90, 0x06, 0x3e, 0x1a, 0x61,
    0x74, 0xbe, 0x04, 0xf5, 0x7a, 0x69, 0x1b, 0x9d, 0x56, 0xfc, 0x83, 0xb7, 0x60, 0xc1, 0x5e, 0x9d,
    0x85, 0x34, 0xfd, 0x02, 0x1a, 0xba, 0x2c, 0x09, 0x72, 0xa7, 0x4a, 0x5e, 0x18, 0xbf, 0xc0, 0x58,
    0xa7, 0x49, 0x34, 0x46, 0x61, 0x59, 0x0e, 0xe2, 0x6e, 0x9e, 0xd2, 0xdb, 0xfd, 0x72, 0x2f, 0x3c,
    0x47, 0xcc, 0x5f, 0x99, 0x62, 0xee, 0x0d, 0xf3, 0x1f, 0x30, 0x25, 0x20, 0x92, 0x15, 0x4b, 0x04,
    0xfe, 0x15, 0x19, 0x1d, 0xdc, 0x7e, 0x5c, 0x10, 0x21, 0x52, 0x21, 0x91, 0x54, 0x60, 0x8b, 0x92,
    0x41, 0x02, 0x03, 0x01, 0x00, 0x01
]);

// Use an unencrypted PKCS #8 PrivateKeyInfo.
var DEFAULT_RSA_PRIVATE_KEY_DER = new Buffer([
    0x30, 0x82, 0x04, 0xbf, 0x02, 0x01, 0x00, 0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7,
    0x0d, 0x01, 0x01, 0x01, 0x05, 0x00, 0x04, 0x82, 0x04, 0xa9, 0x30, 0x82, 0x04, 0xa5, 0x02, 0x01,
    0x00, 0x02, 0x82, 0x01, 0x01, 0x00, 0xb8, 0x09, 0xa7, 0x59, 0x82, 0x84, 0xec, 0x4f, 0x06, 0xfa,
    0x1c, 0xb2, 0xe1, 0x38, 0x93, 0x53, 0xbb, 0x7d, 0xd4, 0xac, 0x88, 0x1a, 0xf8, 0x25, 0x11, 0xe4,
    0xfa, 0x1d, 0x61, 0x24, 0x5b, 0x82, 0xca, 0xcd, 0x72, 0xce, 0xdb, 0x66, 0xb5, 0x8d, 0x54, 0xbd,
    0xfb, 0x23, 0xfd, 0xe8, 0x8e, 0xaf, 0xa7, 0xb3, 0x79, 0xbe, 0x94, 0xb5, 0xb7, 0xba, 0x17, 0xb6,
    0x05, 0xae, 0xce, 0x43, 0xbe, 0x3b, 0xce, 0x6e, 0xea, 0x07, 0xdb, 0xbf, 0x0a, 0x7e, 0xeb, 0xbc,
    0xc9, 0x7b, 0x62, 0x3c, 0xf5, 0xe1, 0xce, 0xe1, 0xd9, 0x8d, 0x9c, 0xfe, 0x1f, 0xc7, 0xf8, 0xfb,
    0x59, 0xc0, 0x94, 0x0b, 0x2c, 0xd9, 0x7d, 0xbc, 0x96, 0xeb, 0xb8, 0x79, 0x22, 0x8a, 0x2e, 0xa0,
    0x12, 0x1d, 0x42, 0x07, 0xb6, 0x5d, 0xdb, 0xe1, 0xf6, 0xb1, 0x5d, 0x7b, 0x1f, 0x54, 0x52, 0x1c,
    0xa3, 0x11, 0x9b, 0xf9, 0xeb, 0xbe, 0xb3, 0x95, 0xca, 0xa5, 0x87, 0x3f, 0x31, 0x18, 0x1a, 0xc9,
    0x99, 0x01, 0xec, 0xaa, 0x90, 0xfd, 0x8a, 0x36, 0x35, 0x5e, 0x12, 0x81, 0xbe, 0x84, 0x88, 0xa1,
    0x0d, 0x19, 0x2a, 0x4a, 0x66, 0xc1, 0x59, 0x3c, 0x41, 0x83, 0x3d, 0x3d, 0xb8, 0xd4, 0xab, 0x34,
    0x90, 0x06, 0x3e, 0x1a, 0x61, 0x74, 0xbe, 0x04, 0xf5, 0x7a, 0x69, 0x1b, 0x9d, 0x56, 0xfc, 0x83,
    0xb7, 0x60, 0xc1, 0x5e, 0x9d, 0x85, 0x34, 0xfd, 0x02, 0x1a, 0xba, 0x2c, 0x09, 0x72, 0xa7, 0x4a,
    0x5e, 0x18, 0xbf, 0xc0, 0x58, 0xa7, 0x49, 0x34, 0x46, 0x61, 0x59, 0x0e, 0xe2, 0x6e, 0x9e, 0xd2,
    0xdb, 0xfd, 0x72, 0x2f, 0x3c, 0x47, 0xcc, 0x5f, 0x99, 0x62, 0xee, 0x0d, 0xf3, 0x1f, 0x30, 0x25,
    0x20, 0x92, 0x15, 0x4b, 0x04, 0xfe, 0x15, 0x19, 0x1d, 0xdc, 0x7e, 0x5c, 0x10, 0x21, 0x52, 0x21,
    0x91, 0x54, 0x60, 0x8b, 0x92, 0x41, 0x02, 0x03, 0x01, 0x00, 0x01, 0x02, 0x82, 0x01, 0x01, 0x00,
    0x8a, 0x05, 0xfb, 0x73, 0x7f, 0x16, 0xaf, 0x9f, 0xa9, 0x4c, 0xe5, 0x3f, 0x26, 0xf8, 0x66, 0x4d,
    0xd2, 0xfc, 0xd1, 0x06, 0xc0, 0x60, 0xf1, 0x9f, 0xe3, 0xa6, 0xc6, 0x0a, 0x48, 0xb3, 0x9a, 0xca,
    0x21, 0xcd, 0x29, 0x80, 0x88, 0x3d, 0xa4, 0x85, 0xa5, 0x7b, 0x82, 0x21, 0x81, 0x28, 0xeb, 0xf2,
    0x43, 0x24, 0xb0, 0x76, 0xc5, 0x52, 0xef, 0xc2, 0xea, 0x4b, 0x82, 0x41, 0x92, 0xc2, 0x6d, 0xa6,
    0xae, 0xf0, 0xb2, 0x26, 0x48, 0xa1, 0x23, 0x7f, 0x02, 0xcf, 0xa8, 0x90, 0x17, 0xa2, 0x3e, 0x8a,
    0x26, 0xbd, 0x6d, 0x8a, 0xee, 0xa6, 0x0c, 0x31, 0xce, 0xc2, 0xbb, 0x92, 0x59, 0xb5, 0x73, 0xe2,
    0x7d, 0x91, 0x75, 0xe2, 0xbd, 0x8c, 0x63, 0xe2, 0x1c, 0x8b, 0xc2, 0x6a, 0x1c, 0xfe, 0x69, 0xc0,
    0x44, 0xcb, 0x58, 0x57, 0xb7, 0x13, 0x42, 0xf0, 0xdb, 0x50, 0x4c, 0xe0, 0x45, 0x09, 0x8f, 0xca,
    0x45, 0x8a, 0x06, 0xfe, 0x98, 0xd1, 0x22, 0xf5, 0x5a, 0x9a, 0xdf, 0x89, 0x17, 0xca, 0x20, 0xcc,
    0x12, 0xa9, 0x09, 0x3d, 0xd5, 0xf7, 0xe3, 0xeb, 0x08, 0x4a, 0xc4, 0x12, 0xc0, 0xb9, 0x47, 0x6c,
    0x79, 0x50, 0x66, 0xa3, 0xf8, 0xaf, 0x2c, 0xfa, 0xb4, 0x6b, 0xec, 0x03, 0xad, 0xcb, 0xda, 0x24,
    0x0c, 0x52, 0x07, 0x87, 0x88, 0xc0, 0x21, 0xf3, 0x02, 0xe8, 0x24, 0x44, 0x0f, 0xcd, 0xa0, 0xad,
    0x2f, 0x1b, 0x79, 0xab, 0x6b, 0x49, 0x4a, 0xe6, 0x3b, 0xd0, 0xad, 0xc3, 0x48, 0xb9, 0xf7, 0xf1,
    0x34, 0x09, 0xeb, 0x7a, 0xc0, 0xd5, 0x0d, 0x39, 0xd8, 0x45, 0xce, 0x36, 0x7a, 0xd8, 0xde, 0x3c,
    0xb0, 0x21, 0x96, 0x97, 0x8a, 0xff, 0x8b, 0x23, 0x60, 0x4f, 0xf0, 0x3d, 0xd7, 0x8f, 0xf3, 0x2c,
    0xcb, 0x1d, 0x48, 0x3f, 0x86, 0xc4, 0xa9, 0x00, 0xf2, 0x23, 0x2d, 0x72, 0x4d, 0x66, 0xa5, 0x01,
    0x02, 0x81, 0x81, 0x00, 0xdc, 0x4f, 0x99, 0x44, 0x0d, 0x7f, 0x59, 0x46, 0x1e, 0x8f, 0xe7, 0x2d,
    0x8d, 0xdd, 0x54, 0xc0, 0xf7, 0xfa, 0x46, 0x0d, 0x9d, 0x35, 0x03, 0xf1, 0x7c, 0x12, 0xf3, 0x5a,
    0x9d, 0x83, 0xcf, 0xdd, 0x37, 0x21, 0x7c, 0xb7, 0xee, 0xc3, 0x39, 0xd2, 0x75, 0x8f, 0xb2, 0x2d,
    0x6f, 0xec, 0xc6, 0x03, 0x55, 0xd7, 0x00, 0x67, 0xd3, 0x9b, 0xa2, 0x68, 0x50, 0x6f, 0x9e, 0x28,
    0xa4, 0x76, 0x39, 0x2b, 0xb2, 0x65, 0xcc, 0x72, 0x82, 0x93, 0xa0, 0xcf, 0x10, 0x05, 0x6a, 0x75,
    0xca, 0x85, 0x35, 0x99, 0xb0, 0xa6, 0xc6, 0xef, 0x4c, 0x4d, 0x99, 0x7d, 0x2c, 0x38, 0x01, 0x21,
    0xb5, 0x31, 0xac, 0x80, 0x54, 0xc4, 0x18, 0x4b, 0xfd, 0xef, 0xb3, 0x30, 0x22, 0x51, 0x5a, 0xea,
    0x7d, 0x9b, 0xb2, 0x9d, 0xcb, 0xba, 0x3f, 0xc0, 0x1a, 0x6b, 0xcd, 0xb0, 0xe6, 0x2f, 0x04, 0x33,
    0xd7, 0x3a, 0x49, 0x71, 0x02, 0x81, 0x81, 0x00, 0xd5, 0xd9, 0xc9, 0x70, 0x1a, 0x13, 0xb3, 0x39,
    0x24, 0x02, 0xee, 0xb0, 0xbb, 0x84, 0x17, 0x12, 0xc6, 0xbd, 0x65, 0x73, 0xe9, 0x34, 0x5d, 0x43,
    0xff, 0xdc, 0xf8, 0x55, 0xaf, 0x2a, 0xb9, 0xe1, 0xfa, 0x71, 0x65, 0x4e, 0x50, 0x0f, 0xa4, 0x3b,
    0xe5, 0x68, 0xf2, 0x49, 0x71, 0xaf, 0x15, 0x88, 0xd7, 0xaf, 0xc4, 0x9d, 0x94, 0x84, 0x6b, 0x5b,
    0x10, 0xd5, 0xc0, 0xaa, 0x0c, 0x13, 0x62, 0x99, 0xc0, 0x8b, 0xfc, 0x90, 0x0f, 0x87, 0x40, 0x4d,
    0x58, 0x88, 0xbd, 0xe2, 0xba, 0x3e, 0x7e, 0x2d, 0xd7, 0x69, 0xa9, 0x3c, 0x09, 0x64, 0x31, 0xb6,
    0xcc, 0x4d, 0x1f, 0x23, 0xb6, 0x9e, 0x65, 0xd6, 0x81, 0xdc, 0x85, 0xcc, 0x1e, 0xf1, 0x0b, 0x84,
    0x38, 0xab, 0x93, 0x5f, 0x9f, 0x92, 0x4e, 0x93, 0x46, 0x95, 0x6b, 0x3e, 0xb6, 0xc3, 0x1b, 0xd7,
    0x69, 0xa1, 0x0a, 0x97, 0x37, 0x78, 0xed, 0xd1, 0x02, 0x81, 0x80, 0x33, 0x18, 0xc3, 0x13, 0x65,
    0x8e, 0x03, 0xc6, 0x9f, 0x90, 0x00, 0xae, 0x30, 0x19, 0x05, 0x6f, 0x3c, 0x14, 0x6f, 0xea, 0xf8,
    0x6b, 0x33, 0x5e, 0xee, 0xc7, 0xf6, 0x69, 0x2d, 0xdf, 0x44, 0x76, 0xaa, 0x32, 0xba, 0x1a, 0x6e,
    0xe6, 0x18, 0xa3, 0x17, 0x61, 0x1c, 0x92, 0x2d, 0x43, 0x5d, 0x29, 0xa8, 0xdf, 0x14, 0xd8, 0xff,
    0xdb, 0x38, 0xef, 0xb8, 0xb8, 0x2a, 0x96, 0x82, 0x8e, 0x68, 0xf4, 0x19, 0x8c, 0x42, 0xbe, 0xcc,
    0x4a, 0x31, 0x21, 0xd5, 0x35, 0x6c, 0x5b, 0xa5, 0x7c, 0xff, 0xd1, 0x85, 0x87, 0x28, 0xdc, 0x97,
    0x75, 0xe8, 0x03, 0x80, 0x1d, 0xfd, 0x25, 0x34, 0x41, 0x31, 0x21, 0x12, 0x87, 0xe8, 0x9a, 0xb7,
    0x6a, 0xc0, 0xc4, 0x89, 0x31, 0x15, 0x45, 0x0d, 0x9c, 0xee, 0xf0, 0x6a, 0x2f, 0xe8, 0x59, 0x45,
    0xc7, 0x7b, 0x0d, 0x6c, 0x55, 0xbb, 0x43, 0xca, 0xc7, 0x5a, 0x01, 0x02, 0x81, 0x81, 0x00, 0xab,
    0xf4, 0xd5, 0xcf, 0x78, 0x88, 0x82, 0xc2, 0xdd, 0xbc, 0x25, 0xe6, 0xa2, 0xc1, 0xd2, 0x33, 0xdc,
    0xef, 0x0a, 0x97, 0x2b, 0xdc, 0x59, 0x6a, 0x86, 0x61, 0x4e, 0xa6, 0xc7, 0x95, 0x99, 0xa6, 0xa6,
    0x55, 0x6c, 0x5a, 0x8e, 0x72, 0x25, 0x63, 0xac, 0x52, 0xb9, 0x10, 0x69, 0x83, 0x99, 0xd3, 0x51,
    0x6c, 0x1a, 0xb3, 0x83, 0x6a, 0xff, 0x50, 0x58, 0xb7, 0x28, 0x97, 0x13, 0xe2, 0xba, 0x94, 0x5b,
    0x89, 0xb4, 0xea, 0xba, 0x31, 0xcd, 0x78, 0xe4, 0x4a, 0x00, 0x36, 0x42, 0x00, 0x62, 0x41, 0xc6,
    0x47, 0x46, 0x37, 0xea, 0x6d, 0x50, 0xb4, 0x66, 0x8f, 0x55, 0x0c, 0xc8, 0x99, 0x91, 0xd5, 0xec,
    0xd2, 0x40, 0x1c, 0x24, 0x7d, 0x3a, 0xff, 0x74, 0xfa, 0x32, 0x24, 0xe0, 0x11, 0x2b, 0x71, 0xad,
    0x7e, 0x14, 0xa0, 0x77, 0x21, 0x68, 0x4f, 0xcc, 0xb6, 0x1b, 0xe8, 0x00, 0x49, 0x13, 0x21, 0x02,
    0x81, 0x81, 0x00, 0xb6, 0x18, 0x73, 0x59, 0x2c, 0x4f, 0x92, 0xac, 0xa2, 0x2e, 0x5f, 0xb6, 0xbe,
    0x78, 0x5d, 0x47, 0x71, 0x04, 0x92, 0xf0, 0xd7, 0xe8, 0xc5, 0x7a, 0x84, 0x6b, 0xb8, 0xb4, 0x30,
    0x1f, 0xd8, 0x0d, 0x58, 0xd0, 0x64, 0x80, 0xa7, 0x21, 0x1a, 0x48, 0x00, 0x37, 0xd6, 0x19, 0x71,
    0xbb, 0x91, 0x20, 0x9d, 0xe2, 0xc3, 0xec, 0xdb, 0x36, 0x1c, 0xca, 0x48, 0x7d, 0x03, 0x32, 0x74,
    0x1e, 0x65, 0x73, 0x02, 0x90, 0x73, 0xd8, 0x3f, 0xb5, 0x52, 0x35, 0x79, 0x1c, 0xee, 0x93, 0xa3,
    0x32, 0x8b, 0xed, 0x89, 0x98, 0xf1, 0x0c, 0xd8, 0x12, 0xf2, 0x89, 0x7f, 0x32, 0x23, 0xec, 0x67,
    0x66, 0x52, 0x83, 0x89, 0x99, 0x5e, 0x42, 0x2b, 0x42, 0x4b, 0x84, 0x50, 0x1b, 0x3e, 0x47, 0x6d,
    0x74, 0xfb, 0xd1, 0xa6, 0x10, 0x20, 0x6c, 0x6e, 0xbe, 0x44, 0x3f, 0xb9, 0xfe, 0xbc, 0x8d, 0xda,
    0xcb, 0xea, 0x8f
]);




var Compute = function(prefix, face, keyChain, certificateName, dPrefix)
{

  this.face = face;
  this.prefix = prefix;
  this.keyChain = keyChain;
  this.certificateName = certificateName;
  this.commandPrefix = (new Name(prefix));//.append("testApp").append();
  this.heartbeatList = [];
//  this.heartbeatList.push("/upec/storage/heartbeat");
   
  this.face.registerPrefix(this.commandPrefix, this.onInterest.bind(this), this.onRegisterFailed.bind(this), this.onRegisterSuccess.bind(this));
  //this.sendInterest(this.name_prefix);
    
};


// OnRegistration success
Compute.prototype.onRegisterSuccess = function(prefix) 
{
  console.log("Prefix registration succeeded for: " + prefix);

};

// OnRegistration success
Compute.prototype.onRegisterFailed = function(prefix, reason)
{
  console.log("Prefix registration failed for: " + prefix + " for this reason: " + reason);
  this.face.close();  // This will cause the script to quit.
};



//send Interest
Compute.prototype.sendInterest = function(name) 
{
  console.log("Prepare to send interest for: " + name.toUri());
  
    var inter = new Interest();
    inter.setName(name);
    inter.setInterestLifetimeMilliseconds(1000);
    var prefix = name.toUri();

    var stor = prefix.toLowerCase().includes("compute");
    var ht = prefix.toLowerCase().includes("heartbeat");
    var st = prefix.toLowerCase().includes("stop"); 
    if(stor||ht||st){
	inter.setMustBeFresh(true);    
    }
    
    this.face.expressInterest(inter, this.onData.bind(this), this.onTimeout.bind(this), this.onNack.bind(this));
    
  
}



//onData
Compute.prototype.onData = function(interest, data) 
{
  console.log("Received " + data.getName().toUri());
  console.log(data.getContent().buf().toString('binary'));
  //this.face.close();
}

//onTimeout
Compute.prototype.onTimeout = function(interest) 
{
  var name = interest.getName().toUri();
  console.log("Time out for interest " + name);
  //this.face.close();  // This will cause the script to quit.
  //deal with the case for a heartbeat ...
/*
  var part = name.split('/');
  

  var rep = this.prefix + "/" + part[7] + "/" + part[6] + "/" + part[1] + "/" + part[2] + "/" + part[3] + "/" + part[4];

    if(name.includes("heartbeat")){
 
   	console.log("timeout for a heartbeat interest; send replication request");
	var repName = new Name(rep);
	this.sendInterest(repName);
 
   	 //return; 
    }
 */
};


//onNack
Compute.prototype.onNack = function(interest, nack) 
{
  console.log("Nack for interest " + interest.getName().toUri() + " for the reason : " + nack.getReason());

};



//onInterest
 Compute.prototype.onInterest = function(prefix, interest, face, interestFilterId, filter)
{

  var interestName = interest.getName().toUri();

  console.log("Interest received for: " + interestName);




  //var prefixData = this.dataPrefix.toUri(); //"/upec/fileData.txt"
  
  //var prefixStop = prefixData.concat("/stop");

  //check if it's a heartbeat interest; then check if the name is not advertised by the compute ignore it
    if(interestName.includes("heartbeat")){

	//var hlist = this.heartbeatList;

	var n =  inArray(interestName,this.heartbeatList); //hlist.contains();
 	if(n == false){

	  console.log("ignoring heartbeat interest: " + interestName);
          return;
 	}
   	  
    }
   /* Check for computation request send interest for the code; compute and send the next compute request interest; */
   if(interestName.includes("compute")){
	  //like '/upec/compute/lacl/data/1/2/lacl/code'
	  console.log("incoming compute command interest: " + interestName);


      	var words = interestName.split('/');
	
	
	//send interest for the code if the code not available;

	var code = "/" + words[7] + "/" + words[8];
	var code_ = "_" + words[7] + "_" + words[8];
	
	//console.log(code);
	
	if(!sh.test('-e', code_))
	{
		var exec = require('child_process').exec, child;
	
		//var cmd = "ndngetfile " + dataName + " > test.txt";
		var cmd = "ndncatchunks " + code + " > " + code_;

		child = exec(cmd,
		    function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			     console.log('exec error: ' + error);
			}
		    });
	  
	}

	//send interest for the data if the data not available;

	var dataName = "/" + words[3] + "/" + words[4] + "/" + words[5] + "/" + words[6];
	var dataName_ = "_" + words[3] + "_" + words[4] + "_" + words[5] + "_" + words[6];
	
	//send interest for the data
	//console.log("send interest for the data: " + dataName); 
	if(!sh.test('-e', dataName_))
	{	
	 	var exec = require('child_process').exec, child;
	
		//var cmd = "ndngetfile " + dataName + " > test.txt";
		var cmd = "ndncatchunks " + dataName + " > " + dataName_;

		child = exec(cmd,
		    function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			     console.log('exec error: ' + error);
			}
		    }); 
	}
	
	var waitTill = 0;
	while(waitTill<1000){
		waitTill = waitTill + 1;
	}	

	//perform the computation ...
	console.log("we are performing computation");
	var exec = require('child_process').exec, child;
	
		//var cmd = "ndngetfile " + dataName + " > test.txt";
		var cmd = "node " + code_ + " " + dataName_ + " > " + dataName_ + "_out";
	console.log(cmd);
		child = exec(cmd,
		    function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			     console.log('exec error: ' + error);
			}
		    });

	//advertise and publish the result

	if(sh.test('-e', dataName_+"_out"))
	{	
	 	var exec = require('child_process').exec, child;
		
		var out = dataName + "/output";

		//var outPrefix = new Name(out);
	
		//this.face.registerPrefix(outPrefix, this.onInterest.bind(this), this.onRegisterFailed.bind(this), this.onRegisterSuccess.bind(this));
	
		//var cmd = "ndngetfile " + dataName + " > test.txt";
		var cmd = "ndnputchunks " + out + " < " + dataName_ + "_out";

		child = exec(cmd,
		    function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			     console.log('exec error: ' + error);
			}
		    }); 
	}





	


	//create and advertise the heartbeat for this replication /domain/data/heartbeat/2
/*
	var heart = "/" + words[5] + "/" + words[6] + "/" + words[7] + "/" + words[8] + "/heartbeat/" + words[4] + "/" + words[3];
	this.heartbeatList.push(heart);
	console.log(heart);
	
	var heartPrefix = new Name(heart);
	
	this.face.registerPrefix(heartPrefix, this.onInterest.bind(this), this.onRegisterFailed.bind(this), this.onRegisterSuccess.bind(this));
*/
	//send next computation request 
	var repIndex = parseInt(words[5])+1;
	//console.log(repIndex); //like '/upec/compute/lacl/data/1/2/lacl/code'
	//console.log(repIndex);
	if((repIndex<=words[6])){
	  var cmd = "/" + words[1] + "/" + words[2] + "/" + words[3] + "/" + words[4] + "/" + repIndex + "/" + words[6] + "/" + words[7] + "/" + words[8];
	  //console.log(cmd);
	  console.log("send interest for the next computation: " + cmd);
	  var nextName = new Name(cmd);
	  this.sendInterest(nextName);
	}else{
		 //send stop interest for the client
		var stopName = new Name(dataName+"/stop");
		this.sendInterest(stopName);
	}
	
	


//schedule and the heartbeat process...
                //check and send stop command if needed
          //return;
/*	if(repIndex==0){

		var heartNext  = "/" + words[5] + "/" + words[6] + "/" + words[7] + "/" + words[8] + "/heartbeat/" + words[3] + "/" + words[3];
		//send stop in this case /lacl/data/stop;
		var stop =  "/" + words[5] + "/" + words[6] + "/" + words[7] + "/" + words[8] + "/stop/";
		var  stopName = new Name(stop);
		this.sendInterest(stopName);
		

	}else{
		
		var heartNext  = "/" + words[5] + "/" + words[6] + "/" + words[7] + "/" + words[8] + "/heartbeat/" + repIndex + "/" + words[3];
	
	}
*/		
/*	setTimeout(() => {
 	  this.sendHeartbeat(heartNext);
	}, 20000);
*/	  
				  
    }

      this.onInterestResponse(interest,this.face);

};


//onInterestResponse
 Compute.prototype.onInterestResponse = function(interest,face)
{
  console.log("Sending response for: " + interest.getName());

  var content = "HELLO";

  var dataName = new Name(interest.getName());
 

  if (content != null) {
  
    var co = new Data(interest.getName());
    co.setContent(content);
    console.log("Send data for: " + interest.getName());
    this.keyChain.sign(co, this.certificateName, function() {

      try {
        face.putData(co);
      }
      catch (e) {
        console.log(e.toString());
      }
    });
  }

};

//sendHeartbeat
 Compute.prototype.sendHeartbeat = function(name)
{
	var  heartNextName = new Name(name);
	this.sendInterest(heartNextName);
	setTimeout(() => {
 	  this.sendHeartbeat(name);
	}, 10000);
};

function initiate()
{

  //define the prefix for replication command; This should be a list, with all the prefixes; but for now, we consider only one prefix
  var prefix = "/upec/compute";
  
  var face = new Face(new UnixTransport());

  // Set up the KeyChain.
  var keyChain = new KeyChain("pib-memory:", "tpm-memory:");
  // This puts the public key in the pibImpl used by the SelfVerifyPolicyManager.
  keyChain.importSafeBag(new SafeBag
    (new Name("/testname/KEY/123"),
     new Blob(DEFAULT_RSA_PRIVATE_KEY_DER, false),
     new Blob(DEFAULT_RSA_PUBLIC_KEY_DER, false)));

  face.setCommandSigningInfo(keyChain, keyChain.getDefaultCertificateName());
  
  var compute = new Compute(prefix, face, keyChain,
     keyChain.getDefaultCertificateName());

 
}

//function to check if an elment is in an arry
function inArray(element, list) {
    var length = list.length;
    for(var i = 0; i < length; i++) {
        if(list[i] == element)
            return true;
    }
    return false;
}


initiate();
