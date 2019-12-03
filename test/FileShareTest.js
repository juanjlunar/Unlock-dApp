const FileShare = artifacts.require('FileShare');

contract('FileShare', async accounts => {
    let fileShare;

    beforeEach(async () => {
        fileShare = await FileShare.new();
    });

    it('File stored correctly.', async () => {
        await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description');
    });

    it('The goal was not sent correctly, trying store a file.', async () => {
        try {
            await fileShare.storeFile(0, 'https://ipfs/file', 'Title', 'Description');
            assert.fail();
        } catch(e) {
            assert.ok(/The goal field is required and should be greater than 0./.test(e.message));
        }
    });

    it('The link for the file was not sent correctly, trying store a file.', async () => {
        try {
            await fileShare.storeFile(200, '', 'Title', 'Description');
            assert.fail();
        } catch(e) {
            assert.ok(/The url field is required./.test(e.message));
        }
    });

    it('The title was not sent correctly, trying store a file.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', '', 'Description');
            assert.fail();
        } catch(e) {
            assert.ok(/The title field is required./.test(e.message));
        }
    });

    it('The description was not sent correctly, trying store a file.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', '');
            assert.fail();
        } catch(e) {
            assert.ok(/The description field is required./.test(e.message));
        }
    });

    it('Get all files query successfuly.', async () => {
        await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description');
        await fileShare.storeFile(300, 'https://ipfs/file', 'Title', 'Description');
        await fileShare.getAllFilesInfo.call();
    });

    it('Get single file by identifier successfuly', async () => {
        await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description');
        await fileShare.getFileInfo.call(1);
    });

    it('File identifier not found, trying to get a file by identifier.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description');
            await fileShare.getFileInfo.call(2);
            assert.fail();
        } catch(e) {
            assert.ok(/Identifier not found./.test(e.message));
        }
    });

    it('Donating to a file goal successfuly.', async () => {
        await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description');
        await fileShare.donate(1, {from: accounts[0], value: 1000});
    });

    it('File identifier not found, trying to donate in a file goal.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description');
            await fileShare.donate(2, {from: accounts[0], value: 1000});
            assert.fail();
        } catch(e) {
            assert.ok(/Identifier not found./.test(e.message));
        }
    });

    it('Donate amount should be greater than 0, trying to donate in a file goal.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description');
            await fileShare.donate(1, {from: accounts[0], value: 0});
            assert.fail();
        } catch(e) {
            assert.ok(/The minimum value should be greater than 0./.test(e.message));
        }
    });

    it('Withdraw funds successfuly.', async () => {
        await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
        await fileShare.donate(1, {from: accounts[1], value: 400});
        await fileShare.withdraw(1, {from: accounts[0]});
    });

    it('File identifier not found, trying to withdraw available funds in file donations.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
            await fileShare.donate(1, {from: accounts[1], value: 400});
            await fileShare.withdraw(2, {from: accounts[0]});
            assert.fail();
        } catch (e) {
            assert.ok(/Identifier not found./.test(e.message));
        }
    });

    it('No funds to withdraw, trying to withdraw funds when no funds available.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
            await fileShare.withdraw(1, {from: accounts[0]});
            assert.fail();
        } catch (e) {
            assert.ok(/No funds to withdraw./.test(e.message));
        }
    });

    it('You are not the file owner, trying to withdraw funds.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
            await fileShare.donate(1, {from: accounts[1], value: 400});
            await fileShare.withdraw(1, {from: accounts[2]});
            assert.fail();
        } catch (e) {
            assert.ok(/Unauthorized./.test(e.message));
        }
    });

    it('Get available funds successfuly', async () => {
        await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
        await fileShare.donate(1, {from: accounts[1], value: 400});
        await fileShare.getAvailableFunds.call(1);
    });

    it('File identifier not found, trying to query available funds.', async () => {
        try {
            await fileShare.storeFile(400, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
            await fileShare.donate(1, {from: accounts[1], value: 300});
            await fileShare.getAvailableFunds.call(2);
            assert.fail();
        } catch (e) {
            assert.ok(/Identifier not found./.test(e.message));
        }
    });

    it('No funds available, querying available funds', async () => {
        try {
            await fileShare.storeFile(400, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
            await fileShare.donate(1, {from: accounts[1], value: 300});
            await fileShare.getAvailableFunds.call(1);
            assert.fail();
        } catch (e) {
            assert.ok(/No funds to withdraw./.test(e.message));
        }
    });

    it('You are not the file owner, querying available funds.', async () => {
        try {
            await fileShare.storeFile(200, 'https://ipfs/file', 'Title', 'Description', {from: accounts[0]});
            await fileShare.donate(1, {from: accounts[1], value: 400});
            await fileShare.getAvailableFunds.call(1, {from: accounts[2]});
            assert.fail();
        } catch (e) {
            assert.ok(/Unauthorized./.test(e.message));
        }
    });

});